// 
// Copyright 2022 New Vector Ltd
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import Combine
import SwiftUI
import MediaPlayer

// TODO: VoiceBroadcastPlaybackViewModel must be revisited in order to not depend on MatrixSDK
// We need a VoiceBroadcastPlaybackServiceProtocol and VoiceBroadcastAggregatorProtocol
import MatrixSDK

class VoiceBroadcastPlaybackViewModel: VoiceBroadcastPlaybackViewModelType, VoiceBroadcastPlaybackViewModelProtocol {

    // MARK: - Properties

    // MARK: Private
    private let mediaServiceProvider: VoiceMessageMediaServiceProvider
    private let cacheManager: VoiceMessageAttachmentCacheManager
    
    private var voiceBroadcastAggregator: VoiceBroadcastAggregator
    private var voiceBroadcastChunkQueue: [VoiceBroadcastChunk] = []
    private var voiceBroadcastAttachmentCacheManagerLoadResults: [VoiceMessageAttachmentCacheManagerLoadResult] = []
    
    private var audioPlayer: VoiceMessageAudioPlayer?
    private var displayLink: CADisplayLink!
    
    private var isPlaybackInitialized: Bool = false
    private var acceptProgressUpdates: Bool = true
    private var isActuallyPaused: Bool = false
    private var isProcessingVoiceBroadcastChunk: Bool = false
    private var reloadVoiceBroadcastChunkQueue: Bool = false
    private var seekToChunkTime: TimeInterval?
    
    private var lastChunkAddedToPlayer: UInt = 0
    
    private var isPlayingLastChunk: Bool {
        // We can't play the last chunk if the brodcast is not stopped
        guard state.broadcastState == .stopped else {
            return false
        }
        
        let chunks = reorderVoiceBroadcastChunks(chunks: Array(voiceBroadcastAggregator.voiceBroadcast.chunks))
        guard let chunkDuration = chunks.last?.duration else {
            return false
        }
        
        return state.bindings.progress + 1000 >= state.playingState.duration - Float(chunkDuration)
    }
    
    private var playingChunk: VoiceBroadcastChunk? {
        guard let currentAudioPlayerUrl = audioPlayer?.currentUrl,
              let playingEventId = voiceBroadcastAttachmentCacheManagerLoadResults.first(where: { result in
                  result.url == currentAudioPlayerUrl
              })?.eventIdentifier else {
            return nil
        }
        
        let playingChunk = voiceBroadcastAggregator.voiceBroadcast.chunks.first(where: { chunk in
            chunk.attachment.eventId == playingEventId
        })
        return playingChunk
    }
    
    private var isLivePlayback: Bool {
        return (!isPlaybackInitialized || isPlayingLastChunk) && (state.broadcastState == .started || state.broadcastState == .resumed)
    }
    
    private static let defaultBackwardForwardValue: Float = 30000.0 // 30sec in ms
    
    private var fullDateFormatter: DateComponentsFormatter {
        let formatter = DateComponentsFormatter()
        formatter.unitsStyle = .positional
        formatter.allowedUnits = [.hour, .minute, .second]
        return formatter
    }
    
    private var shortDateFormatter: DateComponentsFormatter {
        let formatter = DateComponentsFormatter()
        formatter.unitsStyle = .positional
        formatter.zeroFormattingBehavior = .pad
        formatter.allowedUnits = [.minute, .second]
        return formatter
    }
    
    // MARK: Public
    
    // MARK: - Setup
    
    init(details: VoiceBroadcastPlaybackDetails,
         mediaServiceProvider: VoiceMessageMediaServiceProvider,
         cacheManager: VoiceMessageAttachmentCacheManager,
         voiceBroadcastAggregator: VoiceBroadcastAggregator) {
        self.mediaServiceProvider = mediaServiceProvider
        self.cacheManager = cacheManager
        self.voiceBroadcastAggregator = voiceBroadcastAggregator
        
        let viewState = VoiceBroadcastPlaybackViewState(details: details,
                                                        broadcastState: voiceBroadcastAggregator.voiceBroadcastState,
                                                        playbackState: .stopped,
                                                        playingState: VoiceBroadcastPlayingState(duration: Float(voiceBroadcastAggregator.voiceBroadcast.duration), isLive: false, canMoveForward: false, canMoveBackward: false),
                                                        bindings: VoiceBroadcastPlaybackViewStateBindings(progress: 0),
                                                        decryptionState: VoiceBroadcastPlaybackDecryptionState(errorCount: 0))
        super.init(initialViewState: viewState)
        
        displayLink = CADisplayLink(target: WeakTarget(self, selector: #selector(handleDisplayLinkTick)), selector: WeakTarget.triggerSelector)
        displayLink.isPaused = true
        displayLink.add(to: .current, forMode: .common)
        
        self.voiceBroadcastAggregator.delegate = self
        self.voiceBroadcastAggregator.start()
    }
    
    private func release() {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] release")
        self.stop()
        self.voiceBroadcastAggregator.delegate = nil
        self.voiceBroadcastAggregator.stop()
    }
    
    // MARK: - Public
    
    override func process(viewAction: VoiceBroadcastPlaybackViewAction) {
        switch viewAction {
        case .play:
            play()
        case .pause:
            pause()
        case .redact:
            release()
        case .sliderChange(let didChange):
            didSliderChanged(didChange)
        case .backward:
            backward()
        case .forward:
            forward()
        }
    }
    
    
    // MARK: - Private
    
    /// Listen voice broadcast
    private func play() {
        displayLink.isPaused = false
        isActuallyPaused = false
        
        if let audioPlayer = audioPlayer {
            MXLog.debug("[VoiceBroadcastPlaybackViewModel] play: resume")
            audioPlayer.play()
        } else {
            state.playbackState = .buffering
            if voiceBroadcastAggregator.launchState == .loaded {
                let chunks = voiceBroadcastAggregator.voiceBroadcast.chunks
                MXLog.debug("[VoiceBroadcastPlaybackViewModel] play: restart from the beginning: \(chunks.count) chunks")
                
                // Reinject all the chunks we already have and play them
                voiceBroadcastChunkQueue = Array(chunks)
                handleVoiceBroadcastChunksProcessing()
            }
        }
    }
    
    /// Pause voice broadcast
    private func pause() {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] pause")
        
        displayLink.isPaused = true
        isActuallyPaused = true
        
        if let audioPlayer = audioPlayer, audioPlayer.isPlaying {
            audioPlayer.pause()
        } else {
            state.playbackState = .paused
            state.playingState.isLive = false
        }
    }
    
    private func stopIfVoiceBroadcastOver() {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] stopIfVoiceBroadcastOver")
        
        var shouldStop = false
        
        // Check if the broadcast is over before stopping everything
        if state.broadcastState == .stopped {
            // If we known the last chunk sequence, use it to check if we need to stop
            // Note: it's possible to be in .stopped state and to still have a last chunk sequence at 0 (old versions or a crash during recording). In this case, we use isPlayingLastChunk as a fallback solution
            if voiceBroadcastAggregator.voiceBroadcastLastChunkSequence > 0 {
                // we should stop only if we have already added the last chunk to the player
                shouldStop = (lastChunkAddedToPlayer == voiceBroadcastAggregator.voiceBroadcastLastChunkSequence)
            } else {
                shouldStop = isPlayingLastChunk
            }
        }
        
        if shouldStop {
            stop()
        } else {
            // If not, the player should not stopped. The view state must be move to buffering
            state.playbackState = .buffering
        }
    }
    
    private func stop() {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] stop")
        
        displayLink.isPaused = true
        
        // Objects will be released on audioPlayerDidStopPlaying
        audioPlayer?.stop()
    }
    
    /// Backward (30sec) a voice broadcast
    private func backward() {
        let newProgressValue = context.progress - VoiceBroadcastPlaybackViewModel.defaultBackwardForwardValue
        seek(to: max(newProgressValue, 0.0))
    }

    /// Forward (30sec) a voice broadcast
    private func forward() {
        let newProgressValue = context.progress + VoiceBroadcastPlaybackViewModel.defaultBackwardForwardValue
        seek(to: min(newProgressValue, state.playingState.duration))
    }
    
    private func seek(to seekTime: Float) {
        // Flush the chunks queue and the current audio player playlist
        lastChunkAddedToPlayer = 0
        voiceBroadcastChunkQueue = []
        reloadVoiceBroadcastChunkQueue = isProcessingVoiceBroadcastChunk
        audioPlayer?.removeAllPlayerItems()
        
        let chunks = reorderVoiceBroadcastChunks(chunks: Array(voiceBroadcastAggregator.voiceBroadcast.chunks))
        
        // Reinject the chunks we need and play them
        let remainingTime = state.playingState.duration - seekTime
        var chunksDuration: UInt = 0
        for chunk in chunks.reversed() {
            chunksDuration += chunk.duration
            voiceBroadcastChunkQueue.append(chunk)
            if Float(chunksDuration) >= remainingTime {
                break
            }
        }
        
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] seekTo: restart to time: \(seekTime) milliseconds")
        let time = seekTime - state.playingState.duration + Float(chunksDuration)
        seekToChunkTime = TimeInterval(time / 1000)
        // Check the condition to resume the playback when data will be ready (after the chunk process).
        if state.playbackState != .stopped, isActuallyPaused == false {
            state.playbackState = .buffering
        }
        processPendingVoiceBroadcastChunks()
        
        state.bindings.progress = seekTime
        updateUI()
    }
    
    // MARK: - Voice broadcast chunks playback
    
    /// Start the playback from the beginning or push more chunks to it
    private func processPendingVoiceBroadcastChunks() {
        reorderPendingVoiceBroadcastChunks()
        processNextVoiceBroadcastChunk()
    }
    
    /// Start the playback from the last known chunk
    private func processPendingVoiceBroadcastChunksForLivePlayback() {
        let chunks = reorderVoiceBroadcastChunks(chunks: Array(voiceBroadcastAggregator.voiceBroadcast.chunks))
        if let lastChunk = chunks.last {
            MXLog.debug("[VoiceBroadcastPlaybackViewModel] processPendingVoiceBroadcastChunksForLivePlayback. Use the last chunk: sequence: \(lastChunk.sequence) out of the \(voiceBroadcastChunkQueue.count) chunks")
            voiceBroadcastChunkQueue = [lastChunk]
        }
        processNextVoiceBroadcastChunk()
    }
    
    private func reorderPendingVoiceBroadcastChunks() {
        // Make sure we download and process chunks in the right order
        voiceBroadcastChunkQueue = reorderVoiceBroadcastChunks(chunks: voiceBroadcastChunkQueue)
    }
    private func reorderVoiceBroadcastChunks(chunks: [VoiceBroadcastChunk]) -> [VoiceBroadcastChunk] {
        chunks.sorted(by: {$0.sequence < $1.sequence})
    }
    
    private func processNextVoiceBroadcastChunk() {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] processNextVoiceBroadcastChunk: \(voiceBroadcastChunkQueue.count) chunks remaining")
        
        guard voiceBroadcastChunkQueue.count > 0 else {
            // We cached all chunks. Nothing more to do
            return
        }
        
        guard !isProcessingVoiceBroadcastChunk else {
            // Chunks caching is already in progress
            return
        }

        isProcessingVoiceBroadcastChunk = true
        
        // TODO: Control the download rate to avoid to download all chunk in mass
        // We could synchronise it with the number of chunks in the player playlist (audioPlayer.playerItems)
        
        let chunk = voiceBroadcastChunkQueue.removeFirst()
        
        // numberOfSamples is for the equalizer view we do not support yet
        cacheManager.loadAttachment(chunk.attachment, numberOfSamples: 1) { [weak self] result in
            guard let self = self else {
                return
            }
            
            self.isProcessingVoiceBroadcastChunk = false
            if self.reloadVoiceBroadcastChunkQueue {
                self.reloadVoiceBroadcastChunkQueue = false
                self.processNextVoiceBroadcastChunk()
                return
            }
            
            switch result {
            case .success(let result):
                guard result.eventIdentifier == chunk.attachment.eventId else {
                    return
                }
                self.lastChunkAddedToPlayer = max(self.lastChunkAddedToPlayer, chunk.sequence)
                self.voiceBroadcastAttachmentCacheManagerLoadResults.append(result)
                
                // Instanciate audioPlayer if needed.
                if self.audioPlayer == nil {
                    // Init and start the player on the first chunk
                    let audioPlayer = self.mediaServiceProvider.audioPlayerForIdentifier(result.eventIdentifier)
                    audioPlayer.registerDelegate(self)
                    self.mediaServiceProvider.registerNowPlayingInfoDelegate(self, forPlayer: audioPlayer)
                    
                    audioPlayer.loadContentFromURL(result.url, displayName: chunk.attachment.originalFileName)
                    self.audioPlayer = audioPlayer
                } else {
                    // Append the chunk to the current playlist
                    self.audioPlayer?.addContentFromURL(result.url)
                }
                
                guard let audioPlayer = self.audioPlayer else {
                    MXLog.error("[VoiceBroadcastPlaybackViewModel] processVoiceBroadcastChunkQueue: audioPlayer is nil !")
                    return
                }
                
                // Start or Resume the player. Needed after a buffering
                if self.state.playbackState == .buffering {
                    if audioPlayer.isPlaying == false {
                        MXLog.debug("[VoiceBroadcastPlaybackViewModel] processNextVoiceBroadcastChunk: Start or Resume the player")
                        self.displayLink.isPaused = false
                        audioPlayer.play()
                    } else {
                        self.state.playbackState = .playing
                        self.state.playingState.isLive = self.isLivePlayback
                    }
                }
                
                if let time = self.seekToChunkTime {
                    audioPlayer.seekToTime(time)
                    self.seekToChunkTime = nil
                }
                                
            case .failure (let error):
                MXLog.error("[VoiceBroadcastPlaybackViewModel] processVoiceBroadcastChunkQueue: loadAttachment error", context: error)
                if self.voiceBroadcastChunkQueue.count == 0 {
                    // No more chunk to try. Go to error
                    self.state.playbackState = .error
                }
            }
            
            self.processNextVoiceBroadcastChunk()
        }
    }
    
    private func updateDuration() {
        let duration = voiceBroadcastAggregator.voiceBroadcast.duration
        state.playingState.duration = Float(duration)
        updateUI()
    }
    
    private func dateFormatter(for time: TimeInterval) -> DateComponentsFormatter {
        if time >= 3600 {
            return self.fullDateFormatter
        } else {
            return self.shortDateFormatter
        }
    }
    
    private func didSliderChanged(_ didChange: Bool) {
        acceptProgressUpdates = !didChange
        if didChange {
            audioPlayer?.pause()
            displayLink.isPaused = true
        } else {
            seek(to: state.bindings.progress)
        }
    }
    
    @objc private func handleDisplayLinkTick() {
        guard let playingSequence = self.playingChunk?.sequence else {
            return
        }

        // Get the audioPlayer current time, which is the elapsed time in the currently playing media item.
        // Note: if the audioPlayer is not ready (eg. after a seek), its currentTime will be 0 and we shouldn't update the progress to avoid visual glitches.
        let currentTime = audioPlayer?.currentTime ?? .zero
        if currentTime > 0 {
            let progress = Double(voiceBroadcastAggregator.voiceBroadcast.chunks.filter { chunk in
                chunk.sequence < playingSequence
            }.reduce(0) { $0 + $1.duration}) + currentTime * 1000
            state.bindings.progress = Float(progress)
        }
        
        updateUI()
    }
    
    private func updateUI() {
        let time = TimeInterval(state.playingState.duration / 1000)
        let formatter = dateFormatter(for: time)
        
        let currentProgress = TimeInterval(state.bindings.progress / 1000)
        let remainingTime = time-currentProgress
        var label = ""
        if let remainingTimeString = formatter.string(from: remainingTime) {
            label = Int(remainingTime) == 0 ? remainingTimeString : "-" + remainingTimeString
        }
        state.playingState.elapsedTimeLabel = formatter.string(from: currentProgress)
        state.playingState.remainingTimeLabel = label
        
        state.playingState.canMoveBackward = state.bindings.progress > 0
        state.playingState.canMoveForward = state.bindings.progress < state.playingState.duration
    }
    
    private func handleVoiceBroadcastChunksProcessing() {
        // Handle specifically the case where we were waiting data to start playing a live playback
        if isLivePlayback, state.playbackState == .buffering {
            // Start the playback on the latest one
            processPendingVoiceBroadcastChunksForLivePlayback()
        } else {
            processPendingVoiceBroadcastChunks()
        }
    }
}

// MARK: VoiceBroadcastAggregatorDelegate
extension VoiceBroadcastPlaybackViewModel: VoiceBroadcastAggregatorDelegate {
    func voiceBroadcastAggregatorDidStartLoading(_ aggregator: VoiceBroadcastAggregator) {
    }
    
    func voiceBroadcastAggregatorDidEndLoading(_ aggregator: VoiceBroadcastAggregator) {
    }
    
    func voiceBroadcastAggregator(_ aggregator: VoiceBroadcastAggregator, didFailWithError: Error) {
        MXLog.error("[VoiceBroadcastPlaybackViewModel] voiceBroadcastAggregator didFailWithError:", context: didFailWithError)
    }
    
    func voiceBroadcastAggregator(_ aggregator: VoiceBroadcastAggregator, didReceiveChunk: VoiceBroadcastChunk) {
        voiceBroadcastChunkQueue.append(didReceiveChunk)
    }
    
    func voiceBroadcastAggregator(_ aggregator: VoiceBroadcastAggregator, didReceiveState: VoiceBroadcastInfoState) {
        state.broadcastState = didReceiveState
        
        // Handle the live icon appearance
        state.playingState.isLive = isLivePlayback
        
        // Handle the case where the playback state is .buffering and the new broadcast state is .stopped
        if didReceiveState == .stopped, self.state.playbackState == .buffering {
            stopIfVoiceBroadcastOver()
        }
    }
    
    func voiceBroadcastAggregatorDidUpdateData(_ aggregator: VoiceBroadcastAggregator) {
        updateDuration()
        
        if state.playbackState != .stopped, !isActuallyPaused {
            handleVoiceBroadcastChunksProcessing()
        }
    }
    
    func voiceBroadcastAggregator(_ aggregator: VoiceBroadcastAggregator, didUpdateUndecryptableEventList events: Set<MXEvent>) {
        state.decryptionState.errorCount = events.count
        if events.count > 0 {
            MXLog.debug("[VoiceBroadcastPlaybackViewModel] voice broadcast decryption error count: \(events.count)/\(aggregator.voiceBroadcast.chunks.count)")
            
            if [.playing, .buffering].contains(state.playbackState) {
                pause()
            }
        }
    }
}


// MARK: - VoiceMessageAudioPlayerDelegate
extension VoiceBroadcastPlaybackViewModel: VoiceMessageAudioPlayerDelegate {
    func audioPlayerDidFinishLoading(_ audioPlayer: VoiceMessageAudioPlayer) {
    }
    
    func audioPlayerDidStartPlaying(_ audioPlayer: VoiceMessageAudioPlayer) {
        state.playbackState = .playing
        state.playingState.isLive = isLivePlayback
        isPlaybackInitialized = true
        displayLink.isPaused = false
    }
    
    func audioPlayerDidPausePlaying(_ audioPlayer: VoiceMessageAudioPlayer) {
        state.playbackState = .paused
        state.playingState.isLive = false
        displayLink.isPaused = true
    }
    
    func audioPlayerDidStopPlaying(_ audioPlayer: VoiceMessageAudioPlayer) {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] audioPlayerDidStopPlaying")
        state.playbackState = .stopped
        state.playingState.isLive = false
        audioPlayer.deregisterDelegate(self)
        self.mediaServiceProvider.deregisterNowPlayingInfoDelegate(forPlayer: audioPlayer)
        self.audioPlayer = nil
        displayLink.isPaused = true
    }
    
    func audioPlayer(_ audioPlayer: VoiceMessageAudioPlayer, didFailWithError error: Error) {
        state.playbackState = .error
    }
    
    func audioPlayerDidFinishPlaying(_ audioPlayer: VoiceMessageAudioPlayer) {
        MXLog.debug("[VoiceBroadcastPlaybackViewModel] audioPlayerDidFinishPlaying: \(audioPlayer.playerItems.count)")
        stopIfVoiceBroadcastOver()
    }
}

// MARK: - VoiceMessageNowPlayingInfoDelegate

extension VoiceBroadcastPlaybackViewModel: VoiceMessageNowPlayingInfoDelegate {
    
    func shouldSetupRemoteCommandCenter(audioPlayer player: VoiceMessageAudioPlayer) -> Bool {
        guard BuildSettings.allowBackgroundAudioMessagePlayback, audioPlayer != nil, audioPlayer === player else {
            return false
        }
        
        // we should setup the remote command center only for ended voice broadcast because we won't get new chunk if the app is in background.
        return state.broadcastState == .stopped
    }
    
    func shouldDisconnectFromNowPlayingInfoCenter(audioPlayer player: VoiceMessageAudioPlayer) -> Bool {
        guard BuildSettings.allowBackgroundAudioMessagePlayback, audioPlayer != nil, audioPlayer === player else {
            return true
        }
        
        // we should disconnect from the now playing info center if the playback is stopped or if the broadcast is in progress
        return state.playbackState == .stopped || state.broadcastState != .stopped
    }
    
    func updateNowPlayingInfoCenter(forPlayer player: VoiceMessageAudioPlayer) {
        guard audioPlayer != nil, audioPlayer === player else {
            return
        }
        
        // Don't update the NowPlayingInfoCenter for live broadcasts
        guard state.broadcastState == .stopped else {
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
            return
        }
        
        let nowPlayingInfoCenter = MPNowPlayingInfoCenter.default()
        nowPlayingInfoCenter.nowPlayingInfo = [
            // Title
            MPMediaItemPropertyTitle: VectorL10n.voiceBroadcastPlaybackLockScreenPlaceholder,
            // Duration
            MPMediaItemPropertyPlaybackDuration: (state.playingState.duration / 1000.0) as Any,
            // Elapsed time
            MPNowPlayingInfoPropertyElapsedPlaybackTime: (state.bindings.progress / 1000.0) as Any,
        ]
    }
}

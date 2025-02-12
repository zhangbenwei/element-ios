// 
// Copyright 2023 New Vector Ltd
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

import Foundation

#if DEBUG

/// Configuration for enabling / disabling Matrix Crypto SDK
@objcMembers class CryptoSDKConfiguration: NSObject {
    static let shared = CryptoSDKConfiguration()
    
    func setup() {
        guard MXSDKOptions.sharedInstance().isCryptoSDKAvailable else {
            return
        }
        
        let isEnabled = RiotSettings.shared.enableCryptoSDK
        MXSDKOptions.sharedInstance().enableCryptoSDK = isEnabled
        
        MXLog.debug("[CryptoSDKConfiguration] setup: Crypto SDK is \(isEnabled ? "enabled" : "disabled")")
    }
    
    func enable() {
        guard MXSDKOptions.sharedInstance().isCryptoSDKAvailable else {
            return
        }
        
        RiotSettings.shared.enableCryptoSDK = true
        MXSDKOptions.sharedInstance().enableCryptoSDK = true
        
        MXLog.debug("[CryptoSDKConfiguration] enabling Crypto SDK")
    }
    
    func disable() {
        RiotSettings.shared.enableCryptoSDK = false
        MXSDKOptions.sharedInstance().enableCryptoSDK = false
        
        MXLog.debug("[CryptoSDKConfiguration] disabling Crypto SDK")
    }
}

#endif

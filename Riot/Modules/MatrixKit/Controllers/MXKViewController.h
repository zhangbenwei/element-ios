/*
 Copyright 2015 OpenMarket Ltd
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

#import "MXKViewControllerHandling.h"
#import "MXKActivityHandlingViewController.h"

#define kScreenWidth [UIScreen mainScreen].bounds.size.width 
#define kScreenHeight [UIScreen mainScreen].bounds.size.height
#define IPHONE_6P_kScreenWidth 414.0f // iPhone6P屏幕的宽
#define RealWidth (kScreenWidth < kScreenHeight ? kScreenWidth : kScreenHeight)
#define kRPViewRatio (RealWidth/IPHONE_6P_kScreenWidth)  // 缩放比例
#define kRPRealValue(value) ((value)* kRPViewRatio) // 根据比例得到实际的尺寸

#define isIphoneXFamily ((kScreenWidth / kScreenHeight) < 0.56 ? YES : NO)
#define Height_StatusBar [[NSUserDefaults standardUserDefaults] doubleForKey:@"HVStatusBarHeight"]
#define Height_NavBar (Height_StatusBar + 44.f)
#define ISIPHONE_XSERIES   ((Height_StatusBar == (20.0)) ? NO : YES)
#define Height_TabBar (ISIPHONE_XSERIES ? 84.0 : 49.0)
#define Height_NOTabBar (ISIPHONE_XSERIES ? (35.0f) : 0)
#define Height_NOStatus (ISIPHONE_XSERIES ? (44.0f) : 0)
#define playWidth  ((Height_StatusBar == (20.0) ) ? kScreenWidth:((kScreenHeight - Height_TabBar)/16.0*9.0))
#define statusBarHeight Height_StatusBar

#define playHeight  ((Height_StatusBar == (20.0)) ? kScreenHeight:(kScreenHeight - Height_TabBar))

/**
 MXKViewController extends UIViewController to handle requirements for
 any matrixKit view controllers (see MXKViewControllerHandling protocol).
 
 This class provides some methods to ease keyboard handling. 
 */

@interface MXKViewController : MXKActivityHandlingViewController <MXKViewControllerHandling>


#pragma mark - Keyboard handling

/**
 Call when keyboard display animation is complete.
 
 Override this method to set the actual keyboard view in 'keyboardView' property.
 The 'MXKViewController' instance will then observe the keyboard frame changes, and update 'keyboardHeight' property.
 */
- (void)onKeyboardShowAnimationComplete;

/**
 The current keyboard view (This field is nil when keyboard is dismissed).
 This property should be set when keyboard display animation is complete to track keyboard frame changes.
 */
@property (nonatomic) UIView *keyboardView;

/**
 The current keyboard height (This field is 0 when keyboard is dismissed).
 */
@property CGFloat keyboardHeight;

@end


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

#import "MXKAuthInputsView.h"

NS_ASSUME_NONNULL_BEGIN

@interface EmilCheckInputsView : MXKAuthInputsView
@property (weak, nonatomic) IBOutlet UITextField *emailTextField;
@property (weak, nonatomic) IBOutlet UITextField *passWordTextField;

@property (weak, nonatomic) IBOutlet UIView *emailContainer;
@property (weak, nonatomic) IBOutlet UIView *passwordContainer;

@property (weak, nonatomic) IBOutlet UIView *emailSeparator;
@property (weak, nonatomic) IBOutlet UIView *passwordSeparator;

@property (weak, nonatomic) IBOutlet UILabel *messageLabel;

@property (weak, nonatomic) IBOutlet UIButton *nextStepButton;
@end

NS_ASSUME_NONNULL_END

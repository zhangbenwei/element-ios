/*
 Copyright 2016 OpenMarket Ltd
 
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

#import "MatrixKit.h"

@interface ForgotPasswordInputsView : MXKAuthInputsView
@property (weak, nonatomic) IBOutlet UITextField *userNameTextField;

@property (weak, nonatomic) IBOutlet UITextField *emailTextField;
@property (weak, nonatomic) IBOutlet UITextField *passWordTextField;
@property (weak, nonatomic) IBOutlet UITextField *repeatPasswordTextField;
@property (weak, nonatomic) IBOutlet UITextField *emailCodeTextField;

@property (weak, nonatomic) IBOutlet UIView *emailContainer;
@property (weak, nonatomic) IBOutlet UIView *passwordContainer;
@property (weak, nonatomic) IBOutlet UIView *repeatPasswordContainer;
@property (weak, nonatomic) IBOutlet UIView *userNameContainer;
@property (weak, nonatomic) IBOutlet UIView *EmailCodeContainer;

@property (weak, nonatomic) IBOutlet UIView *emailSeparator;
@property (weak, nonatomic) IBOutlet UIView *passwordSeparator;
@property (weak, nonatomic) IBOutlet UIView *repeatPasswordSeparator;

@property (weak, nonatomic) IBOutlet UILabel *messageLabel;

@property (weak, nonatomic) IBOutlet UIButton *nextStepButton;

@end

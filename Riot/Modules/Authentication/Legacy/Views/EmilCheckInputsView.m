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

#import "EmilCheckInputsView.h"
#import "MXHTTPOperation.h"
#import "ThemeService.h"
#import "GeneratedInterface-Swift.h"

@interface EmilCheckInputsView ()
/**
 The current email validation request operation
 */
@property (nonatomic, strong) MXHTTPOperation *mxCurrentOperation;

/**
 The current set of parameters ready to use.
 */
@property (nonatomic, strong) NSDictionary *parameters;

/**
 The block called when the parameters are ready and the user confirms he has checked his email.
 */
@property (nonatomic, copy) void (^didPrepareParametersCallback)(NSDictionary *parameters, NSError *error);

@property (nonatomic, strong) CADisplayLink * emailCheckDisplayLink;

@property (nonatomic, assign) int displayLinkTarge;

@end

@implementation EmilCheckInputsView

+ (UINib *)nib
{
    return [UINib nibWithNibName:NSStringFromClass(self)
                          bundle:[NSBundle bundleForClass:self]];
}

- (void)awakeFromNib
{
    [super awakeFromNib];
    
    [self.nextStepButton setTitle: [VectorL10n authGetVerificationCode] forState:UIControlStateNormal];
    [self.nextStepButton setTitle:[VectorL10n authGetVerificationCode] forState:UIControlStateHighlighted];
    self.nextStepButton.enabled = YES;
    
    self.emailTextField.placeholder = [VectorL10n authEmailPlaceholder];
    self.passWordTextField.placeholder = [VectorL10n authVerificationCode];

    
    // Apply placeholder color
    [self customizeViewRendering];
}

- (void)destroy
{
    [super destroy];
    
    self.mxCurrentOperation = nil;
    
    self.parameters = nil;
    self.didPrepareParametersCallback = nil;
    
}

- (void)destroyTimer {
    if(_emailCheckDisplayLink){
        self.emailCheckDisplayLink.paused = YES;
        [self.emailCheckDisplayLink invalidate];
        _emailCheckDisplayLink = nil;
    }
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    
    CGRect lastItemFrame;
    if (!self.passwordContainer.isHidden)
    {
        lastItemFrame = self.nextStepButton.frame;
    }
    else
    {
        lastItemFrame = self.messageLabel.frame;
    }
    
    self.viewHeightConstraint.constant = lastItemFrame.origin.y + lastItemFrame.size.height;
}

#pragma mark - Override MXKView

-(void)customizeViewRendering
{
    [super customizeViewRendering];
    
    self.messageLabel.textColor = ThemeService.shared.theme.textPrimaryColor;
    
    self.emailTextField.textColor = ThemeService.shared.theme.textPrimaryColor;
    self.passWordTextField.textColor = ThemeService.shared.theme.textPrimaryColor;
    
    
    self.emailSeparator.backgroundColor = ThemeService.shared.theme.lineBreakColor;
    self.passwordSeparator.backgroundColor = ThemeService.shared.theme.lineBreakColor;
 
    
    self.messageLabel.numberOfLines = 0;
    
    [self.nextStepButton.layer setCornerRadius:5];
    self.nextStepButton.clipsToBounds = YES;
    self.nextStepButton.backgroundColor = ThemeService.shared.theme.tintColor;

    if (self.emailTextField.placeholder)
    {
        self.emailTextField.attributedPlaceholder = [[NSAttributedString alloc]
                                                     initWithString:self.emailTextField.placeholder
                                                     attributes:@{NSForegroundColorAttributeName: ThemeService.shared.theme.placeholderTextColor}];
    }
    if (self.passWordTextField.placeholder)
    {
        self.passWordTextField.attributedPlaceholder = [[NSAttributedString alloc]
                                                        initWithString:self.passWordTextField.placeholder
                                                        attributes:@{NSForegroundColorAttributeName: ThemeService.shared.theme.placeholderTextColor}];
    }
    
    [self.nextStepButton addTarget:self action:@selector(sendCodeAction:) forControlEvents:UIControlEventTouchUpInside];
     
}

- (CADisplayLink *)emailCheckDisplayLink {
    if(_emailCheckDisplayLink == nil){
        self.displayLinkTarge  = 60*5.f;
        _emailCheckDisplayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(updateTimeCount)];
        _emailCheckDisplayLink.preferredFramesPerSecond = 1.f;
        [_emailCheckDisplayLink addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
        _emailCheckDisplayLink.paused = YES;
    }
   return _emailCheckDisplayLink;
}
- (void)sendEmailCode:(NSString *)token{
    MXRestClient *restClient;
    __weak typeof(self) weakSelf = self;
    if (self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewThirdPartyIdValidationRestClient:)])
    {
        restClient = [self.delegate authInputsViewThirdPartyIdValidationRestClient:self];
    }
    if (self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewShowCaptcha:startAnimating:)])
    {
     [self.delegate authInputsViewShowCaptcha:self startAnimating:YES];
    }
    if (restClient)
    {
//        [self sto]
        [self checkIdentityServerRequirement:restClient success:^{

            // Launch email validation
            NSString *clientSecret = [MXTools generateSecret];

            __weak typeof(self) weakSelf = self;
            [restClient emilCheckForEmail:self.emailTextField.text
                                  clientSecret:clientSecret
                              sendAttempt:1 username:self.userNames
                                 isForget:NO token:token
                                  success:^(NSDictionary *response)
             {
                 typeof(weakSelf) strongSelf = weakSelf;
                if (strongSelf.delegate && [strongSelf.delegate respondsToSelector:@selector(authInputsViewShowCaptcha:startAnimating:)])
                {
                 [strongSelf.delegate authInputsViewShowCaptcha:strongSelf startAnimating:NO];
                }
                MXLogDebug(@"[EmilCheckInputsView] success %@",response);
                if([response[@"code"] intValue] == 0){
                    strongSelf.displayLinkTarge  = 60*5.f;
                    strongSelf.emailCheckDisplayLink.paused = NO;
                }else{
                    if([strongSelf.delegate respondsToSelector:@selector(authInputsView:showMessageWitchCode:)]){
                        [strongSelf.delegate authInputsView:strongSelf showMessageWitchCode:[response[@"code"] intValue] ];
                    }
                }
             } failure:^(NSError *error) {
                MXLogDebug(@"[ForgotPasswordInputsView] Failed to request email token");
                 if (weakSelf.delegate && [weakSelf.delegate respondsToSelector:@selector(authInputsViewShowCaptcha:startAnimating:)])
                 {
                  [weakSelf.delegate authInputsViewShowCaptcha:weakSelf startAnimating:NO];
                 }
                 if (([error.domain isEqualToString:NSURLErrorDomain] && error.code == NSURLErrorCancelled))
                 {
                     return;
                 }

                 NSString *errorMessage;
                 // Translate the potential MX error.
                 MXError *mxError = [[MXError alloc] initWithNSError:error];
                 if (mxError && [mxError.errcode isEqualToString:kMXErrCodeStringThreePIDNotFound])
                     errorMessage = [VectorL10n authEmailNotFound];
                 else if (mxError && [mxError.errcode isEqualToString:kMXErrCodeStringServerNotTrusted])
                     errorMessage = [VectorL10n authUntrustedIdServer];
                 else if (error.userInfo[@"error"])
                     errorMessage = error.userInfo[@"error"];
                 else
                     errorMessage = error.localizedDescription;

                 if (weakSelf)
                 {
                     typeof(self) self = weakSelf;

                     if (self->inputsAlert)
                     {
                         [self->inputsAlert dismissViewControllerAnimated:NO completion:nil];
                     }

                     self->inputsAlert = [UIAlertController alertControllerWithTitle:[VectorL10n error] message:errorMessage preferredStyle:UIAlertControllerStyleAlert];

                     [self->inputsAlert addAction:[UIAlertAction actionWithTitle:[VectorL10n ok]
                                                                           style:UIAlertActionStyleDefault
                                                                         handler:^(UIAlertAction * action) {

                                                                             if (weakSelf)
                                                                             {
                                                                                 typeof(self) self = weakSelf;
                                                                                 self->inputsAlert = nil;
                                                                                 if (self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewDidCancelOperation:)])
                                                                                 {
                                                                                     [self.delegate authInputsViewDidCancelOperation:self];
                                                                                 }
                                                                             }

                                                                         }]];

                     [self.delegate authInputsView:self presentAlertController:self->inputsAlert];
                 }
             }];
        } failure:^(NSError *error) {
            if (weakSelf.delegate && [weakSelf.delegate respondsToSelector:@selector(authInputsViewShowCaptcha:startAnimating:)])
            {
             [weakSelf.delegate authInputsViewShowCaptcha:weakSelf startAnimating:NO];
            }
        }];

        // Async response
        return;
    }
    else
    {
        MXLogDebug(@"[ForgotPasswordInputsView] Operation failed during the email identity stage");
    }
}

- (void)sendCodeAction:(UIButton *)sender {
    [self dismissKeyboard];
    if(self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewShowCaptcha:)]){
        [self.delegate authInputsViewShowCaptcha:self];
    }
}
- (void)updateTimeCount {
    NSLog(@"self.displayLinkTarge %d",self.displayLinkTarge);
    self.displayLinkTarge --;
    [self.nextStepButton setTitle:[NSString stringWithFormat:@"%d s后重发",self.displayLinkTarge] forState:UIControlStateNormal];
    [self.nextStepButton setTitle:[NSString stringWithFormat:@"%d s 后重发",self.displayLinkTarge] forState:UIControlStateHighlighted];
    self.nextStepButton.highlighted = NO;
    self.nextStepButton.userInteractionEnabled = NO;
    if(self.displayLinkTarge == 0){
        self.emailCheckDisplayLink.paused = YES;
        [self.nextStepButton setTitle: [VectorL10n authGetVerificationCode] forState:UIControlStateNormal];
        [self.nextStepButton setTitle:[VectorL10n authGetVerificationCode] forState:UIControlStateHighlighted];
        self.nextStepButton.userInteractionEnabled = YES;
    }
}
#pragma mark -

- (BOOL)setAuthSession:(MXAuthenticationSession *)authSession withAuthType:(MXKAuthenticationType)authType;
{
    if (authType == MXKAuthenticationTypeEmilCheck)
    {
        type = MXKAuthenticationTypeEmilCheck;
        
        // authSession is not used here, filled it by default (it should be nil).
        currentSession = authSession;
        
        // Reset UI in initial step
        [self reset];
        
        return YES;
    }
    
    return NO;
}

- (NSString*)validateParameters
{
    // Check the validity of the parameters
    NSString *errorMsg = nil;
    
    if (!self.emailTextField.text.length)
    {
        MXLogDebug(@"[ForgotPasswordInputsView] Missing email");
        errorMsg = [VectorL10n authResetPasswordMissingEmail];
    }
   
    else if (self.passWordTextField.text.length != 5)
    {
        MXLogDebug(@"[ForgotPasswordInputsView] Invalid Passwords");
        errorMsg = @"验证码不正确";
    }
    else
    {
        // Check validity of the non empty email
        if ([MXTools isEmailAddress:self.emailTextField.text] == NO)
        {
            MXLogDebug(@"[ForgotPasswordInputsView] Invalid email");
            errorMsg = [VectorL10n authInvalidEmail];
        }
    }
    
    return errorMsg;
}

- (void)prepareParameters:(void (^)(NSDictionary *parameters, NSError *error))callback
{
    if (callback)
    {
        // Prepare here parameters dict by checking each required fields.
        self.parameters = nil;
        self.didPrepareParametersCallback = nil;
        
        // Check the validity of the parameters
        NSString *errorMsg = [self validateParameters];
        if (errorMsg)
        {
            if (inputsAlert)
            {
                [inputsAlert dismissViewControllerAnimated:NO completion:nil];
            }
            
            inputsAlert = [UIAlertController alertControllerWithTitle:[VectorL10n error] message:errorMsg preferredStyle:UIAlertControllerStyleAlert];
            
            [inputsAlert addAction:[UIAlertAction actionWithTitle:[VectorL10n ok]
                                                            style:UIAlertActionStyleDefault
                                                          handler:^(UIAlertAction * action) {
                                                              
                                                              self->inputsAlert = nil;
                                                              
                                                          }]];
            
            [self.delegate authInputsView:self presentAlertController:inputsAlert];
        }
        else
        {
            // Retrieve the REST client from delegate
            MXRestClient *restClient;
            
            if (self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewThirdPartyIdValidationRestClient:)])
            {
                restClient = [self.delegate authInputsViewThirdPartyIdValidationRestClient:self];
            }
            
            if (restClient)
            {
                [self checkIdentityServerRequirement:restClient success:^{

                    // Launch email validation
                    NSString *clientSecret = [MXTools generateSecret];

                    __weak typeof(self) weakSelf = self;
                    [restClient emilCheckForEmail:self.emailTextField.text
                                          clientSecret:clientSecret
                                           sendAttempt:1
                                               success:^(NSString *sid)
                     {
                         typeof(weakSelf) strongSelf = weakSelf;
                         if (strongSelf) {
                             strongSelf.didPrepareParametersCallback = callback;

                             NSMutableDictionary *threepidCreds = [NSMutableDictionary dictionaryWithDictionary:@{
                                                                                                                  @"client_secret": clientSecret,
                                                                                                                  @"sid": sid
                                                                                                                  }];
                             if (restClient.identityServer)
                             {
                                 NSURL *identServerURL = [NSURL URLWithString:restClient.identityServer];
                                 threepidCreds[@"id_server"] = identServerURL.host;
                             }

                             strongSelf.parameters = @{
                                                       @"auth": @{
                                                               @"threepid_creds": threepidCreds,
                                                               @"type": kMXLoginFlowTypeEmailIdentity
                                                               },
                                                       @"new_password": strongSelf.passWordTextField.text
                                                       };

                             [strongSelf hideInputsContainer];

//                             strongSelf.messageLabel.text = [VectorL10n authResetPasswordEmailValidationMessage:strongSelf.emailTextField.text];
                             strongSelf.messageLabel.text = @"请输入验证码并验证，以便以后找回密码";
                             strongSelf.messageLabel.hidden = NO;

                             [strongSelf.nextStepButton addTarget:strongSelf
                                                           action:@selector(didCheckEmail:)
                                                 forControlEvents:UIControlEventTouchUpInside];

                             strongSelf.nextStepButton.hidden = NO;
                         }
                     }
                                               failure:^(NSError *error)
                     {
                        MXLogDebug(@"[ForgotPasswordInputsView] Failed to request email token");

                         // Ignore connection cancellation error
                         if (([error.domain isEqualToString:NSURLErrorDomain] && error.code == NSURLErrorCancelled))
                         {
                             return;
                         }

                         NSString *errorMessage;

                         // Translate the potential MX error.
                         MXError *mxError = [[MXError alloc] initWithNSError:error];
                         if (mxError && [mxError.errcode isEqualToString:kMXErrCodeStringThreePIDNotFound])
                             errorMessage = [VectorL10n authEmailNotFound];
                         else if (mxError && [mxError.errcode isEqualToString:kMXErrCodeStringServerNotTrusted])
                             errorMessage = [VectorL10n authUntrustedIdServer];
                         else if (error.userInfo[@"error"])
                             errorMessage = error.userInfo[@"error"];
                         else
                             errorMessage = error.localizedDescription;

                         if (weakSelf)
                         {
                             typeof(self) self = weakSelf;

                             if (self->inputsAlert)
                             {
                                 [self->inputsAlert dismissViewControllerAnimated:NO completion:nil];
                             }

                             self->inputsAlert = [UIAlertController alertControllerWithTitle:[VectorL10n error] message:errorMessage preferredStyle:UIAlertControllerStyleAlert];

                             [self->inputsAlert addAction:[UIAlertAction actionWithTitle:[VectorL10n ok]
                                                                                   style:UIAlertActionStyleDefault
                                                                                 handler:^(UIAlertAction * action) {

                                                                                     if (weakSelf)
                                                                                     {
                                                                                         typeof(self) self = weakSelf;
                                                                                         self->inputsAlert = nil;
                                                                                         if (self.delegate && [self.delegate respondsToSelector:@selector(authInputsViewDidCancelOperation:)])
                                                                                         {
                                                                                             [self.delegate authInputsViewDidCancelOperation:self];
                                                                                         }
                                                                                     }

                                                                                 }]];

                             [self.delegate authInputsView:self presentAlertController:self->inputsAlert];
                         }
                     }];
                } failure:^(NSError *error) {
                    callback(nil, error);
                }];

                // Async response
                return;
            }
            else
            {
                MXLogDebug(@"[ForgotPasswordInputsView] Operation failed during the email identity stage");
            }
        }
        
        callback(nil, [NSError errorWithDomain:MXKAuthErrorDomain code:0 userInfo:@{NSLocalizedDescriptionKey:[VectorL10n notSupportedYet]}]);
    }
}

- (BOOL)areAllRequiredFieldsSet
{
    // Keep enable the submit button.
    return YES;
}

- (void)dismissKeyboard
{
    [self.passWordTextField resignFirstResponder];
    [self.emailTextField resignFirstResponder];
    
    [super dismissKeyboard];
}

- (NSString*)password
{
    return self.passWordTextField.text;
}

- (void)nextStep
{
    // Here the password has been reseted with success
    self.didPrepareParametersCallback = nil;
    self.parameters = nil;
    
    [self hideInputsContainer];
    
    self.messageLabel.text = [VectorL10n authResetPasswordSuccessMessage];
    
    self.messageLabel.hidden = NO;
}

#pragma mark - Internals

- (void)reset
{
    // Cancel email validation request
    [self.mxCurrentOperation cancel];
    self.mxCurrentOperation = nil;
    
    self.parameters = nil;
    self.didPrepareParametersCallback = nil;
    
    // Reset UI by hidding all items
    [self hideInputsContainer];
    
    self.messageLabel.text = @"请输入验证码并验证，以便以后找回密码";;
    self.messageLabel.hidden = NO;
    self.nextStepButton.hidden = NO;
    self.emailContainer.hidden = NO;
    self.passwordContainer.hidden = NO;
    [self layoutIfNeeded];
}

- (void)checkIdentityServerRequirement:(MXRestClient*)mxRestClient success:(void (^)(void))success failure:(void (^)(NSError *))failure
{
    [mxRestClient supportedMatrixVersions:^(MXMatrixVersions *matrixVersions) {

        MXLogDebug(@"[ForgotPasswordInputsView] checkIdentityServerRequirement: %@", matrixVersions.doesServerRequireIdentityServerParam ? @"YES": @"NO");

        if (matrixVersions.doesServerRequireIdentityServerParam
            && !mxRestClient.identityServer)
        {
            failure([NSError errorWithDomain:MXKAuthErrorDomain
                                        code:0
                                    userInfo:@{
                                               NSLocalizedDescriptionKey:[VectorL10n authResetPasswordErrorIsRequired]
                                               }]);
        }
        else
        {
            success();
        }

    } failure:failure];
}

#pragma mark - actions

- (void)didCheckEmail:(id)sender
{
    if (sender == self.nextStepButton)
    {
        if (self.didPrepareParametersCallback)
        {
            self.didPrepareParametersCallback(self.parameters, nil);
        }
    }
}

#pragma mark - UITextField delegate

- (BOOL)textFieldShouldReturn:(UITextField*)textField
{
    if (textField.returnKeyType == UIReturnKeyDone)
    {
        // "Done" key has been pressed
        [textField resignFirstResponder];
        
        // Launch authentication now
        [self.delegate authInputsViewDidPressDoneKey:self];
    }
    else
    {
        //"Next" key has been pressed
        if (textField == self.emailTextField)
        {
            [self.passWordTextField becomeFirstResponder];
        }
         
    }
    
    return YES;
}

#pragma mark -

- (void)hideInputsContainer
{
    // Hide all inputs container
    self.passwordContainer.hidden = YES;
    self.emailContainer.hidden = YES;
    // Hide other items
    self.messageLabel.hidden = YES;
    self.nextStepButton.hidden = YES;
}

- (NSString*)userId
{
    return self.emailTextField.text;
}

 
- (NSString*)invitationCode
{
    return self.passWordTextField.text;
}
@end

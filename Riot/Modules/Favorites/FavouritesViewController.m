/*
 Copyright 2017 Vector Creations Ltd

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

#import "FavouritesViewController.h"

#import "RecentsDataSource.h"
#import "GeneratedInterface-Swift.h"

@interface FavouritesViewController () <MasterTabBarItemDisplayProtocol,UIWebViewDelegate,WKScriptMessageHandler>
{    
    RecentsDataSource *recentsDataSource;
}

@property (nonatomic, strong) MXThrottler *tableViewPaginationThrottler;
@property (nonatomic, strong) WKWebView * webView;
@end

@implementation FavouritesViewController

+ (instancetype)instantiate
{
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]];
    FavouritesViewController *viewController = [storyboard instantiateViewControllerWithIdentifier:@"FavouritesViewController"];
    return viewController;
}

- (void)finalizeInit
{
    [super finalizeInit];
    
  //  self.enableDragging = YES;
    
  //  self.screenTracker = [[AnalyticsScreenTracker alloc] initWithScreen:AnalyticsScreenFavourites];
    self.tableViewPaginationThrottler = [[MXThrottler alloc] initWithMinimumDelay:0.1];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.view.accessibilityIdentifier = @"FavouritesVCView";
 
    if (@available(iOS 16.0, *)) {
        self.navigationItem.rightBarButtonItem.hidden = YES;
    } else {
        // Fallback on earlier versions
    }
    
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"getStorage"];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"scanCode"];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"getLang"];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"checkEnvironment"];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"getStorge"];
    [self.webView.configuration.userContentController addScriptMessageHandler:self name:@"payMorse"];
    [self.view addSubview:self.webView];
  
    NSString *hFivePath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"h5"];

    NSURL *url = [NSURL fileURLWithPath:hFivePath];

    [self.webView loadRequest:[NSURLRequest requestWithURL:url]];
    
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [AppDelegate theDelegate].masterTabBarController.tabBar.tintColor = ThemeService.shared.theme.tintColor;
    
    if (recentsDataSource.recentsDataSourceMode != RecentsDataSourceModeFavourites)
    {
        // Take the lead on the shared data source.
    //    [recentsDataSource setDelegate:self andRecentsDataSourceMode:RecentsDataSourceModeFavourites];
        
        // Reset filtering on the shared data source when switching tabs
        [recentsDataSource searchWithPatterns:nil];
     //   [self.recentsSearchBar setText:nil];
    }
}

- (void)destroy
{
    [super destroy];
}
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    
     NSLog(@"%@",message.name);
    if ([message.name isEqualToString:@"requestData"]) {
       //     [self requestData];//ios 通过调用 js方法的方式 ，要把数据传给js，
    }
    if ([message.name isEqualToString:@"WatchVideoWithVideoInfo"]) {
        if ([message.body isKindOfClass:[NSString class]]) {
 
          
        }
    }
    if ([message.name containsString:@"deleteWithTargetId"]) {
             // NSLog(@"body:%@",message.body);
       
    }
    if ([message.name isEqualToString:@"clearHistory"]) {
             // NSLog(@"body:%@",message.body);
        
    }
}

#pragma mark -

//- (void)displayList:(MXKRecentsDataSource *)listDataSource
//{
//    [super displayList:listDataSource];
//
//    // Keep a ref on the recents data source
//    if ([listDataSource isKindOfClass:RecentsDataSource.class])
//    {
//        recentsDataSource = (RecentsDataSource*)listDataSource;
//    }
//}

#pragma mark - Override RecentsViewController

//- (void)refreshCurrentSelectedCell:(BOOL)forceVisible
//{
//    // Check whether the recents data source is correctly configured.
//    if (recentsDataSource.recentsDataSourceMode != RecentsDataSourceModeFavourites)
//    {
//        return;
//    }
//
//    [super refreshCurrentSelectedCell:forceVisible];
//}
//
//#pragma mark -
//
//- (void)scrollToNextRoomWithMissedNotifications
//{
//    // Check whether the recents data source is correctly configured.
//    if (recentsDataSource.recentsDataSourceMode == RecentsDataSourceModeFavourites)
//    {
//        [self scrollToTheTopTheNextRoomWithMissedNotificationsInSection:[recentsDataSource.sections sectionIndexForSectionType:RecentsDataSourceSectionTypeFavorites]];
//    }
//}
//
//#pragma mark - UITableView delegate
//
//- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
//{
//    // Hide the unique header
//    return 0.0f;
//}
//
//- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
//{
//    if ([super respondsToSelector:@selector(tableView:willDisplayCell:forRowAtIndexPath:)])
//    {
//        [super tableView:tableView willDisplayCell:cell forRowAtIndexPath:indexPath];
//    }
//
//    [self.tableViewPaginationThrottler throttle:^{
//        NSInteger section = indexPath.section;
//        if (tableView.numberOfSections <= section)
//        {
//            return;
//        }
//
//        NSInteger numberOfRowsInSection = [tableView numberOfRowsInSection:section];
//        if (indexPath.row == numberOfRowsInSection - 1)
//        {
//            [self->recentsDataSource paginateInSection:section];
//        }
//    }];
//}

#pragma mark - Empty view management

//- (void)updateEmptyView
//{
//    [self.emptyView fillWith:[self emptyViewArtwork]
//                       title:[VectorL10n favouritesEmptyViewTitle]
//             informationText:[VectorL10n favouritesEmptyViewInformation]];
//}
//
//- (UIImage*)emptyViewArtwork
//{
//    if (ThemeService.shared.isCurrentThemeDark)
//    {
//        return AssetImages.favouritesEmptyScreenArtworkDark.image;
//    }
//    else
//    {
//        return AssetImages.favouritesEmptyScreenArtwork.image;
//    }
//}

#pragma mark - MasterTabBarItemDisplayProtocol

- (NSString *)masterTabBarItemTitle
{
    return [VectorL10n titleFavourites];
}
- (WKWebView *)webView {
    if (_webView == nil) {
        _webView = [[WKWebView alloc] initWithFrame:CGRectMake(0, Height_NavBar,kScreenWidth, self.view.frame.size.height - Height_NavBar-Height_TabBar)];
        _webView.scrollView.showsVerticalScrollIndicator= NO;
        _webView.scrollView.showsHorizontalScrollIndicator = NO;
    }
    return _webView;
}
@end

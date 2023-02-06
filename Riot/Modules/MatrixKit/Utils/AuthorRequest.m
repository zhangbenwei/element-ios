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

#import "AuthorRequest.h"


static NSMutableArray   *requestTasksPool;
static NSDictionary     *headers; 
 
@implementation AuthorRequest

+ (AFHTTPSessionManager *)manager {
    static AFHTTPSessionManager *_manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _manager = [AFHTTPSessionManager manager] ;
        // 默认解析模式
        _manager.requestSerializer = [AFHTTPRequestSerializer serializer];
        _manager.responseSerializer = [AFJSONResponseSerializer serializer];
        _manager.requestSerializer.stringEncoding = NSUTF8StringEncoding;
        _manager.requestSerializer.timeoutInterval = 30;
        _manager.requestSerializer.cachePolicy = NSURLRequestReloadIgnoringLocalAndRemoteCacheData;
        _manager.responseSerializer.acceptableContentTypes = [NSSet setWithArray:@[@"application/json",
                                                                                  @"text/html",
                                                                                  @"text/json",
                                                                                  @"text/plain",
                                                                                  @"text/javascript",
                                                                                   @"application/x-javascript",
                                                                                  @"text/xml",
                                                                                  @"image/*",
                                                                                  @"application/octet-stream",@"application/x-www-form-urlencoded" ,@"multipart/form-data", @"application/x-www-form-urlencoded;charset=UTF-8" ,
                                                                                  @"application/zip"]];
         
        
       
    });
  
    // 配置请求序列化
    AFJSONResponseSerializer *serializer = [AFJSONResponseSerializer serializer];
    [serializer setRemovesKeysWithNullValues:YES];
 
    return _manager;
}
+ (URLSessionTask *)postMWithUrl:(NSString *)url
                 refreshRequest:(BOOL)refresh
                          cache:(BOOL)cache
                         params:(NSDictionary *)params
                  progressBlock:(PostProgress)progressBlock
                   successBlock:(ResponseSuccessBlock)successBlock
                      failBlock:(ResponseFailBlock)failBlock {
    __block URLSessionTask *session = nil;
    AFHTTPSessionManager *manager = [self manager];
     NSString *host =[NSString stringWithFormat:@"%@%@",@"https://im.morse.cf",url];
    session = [manager POST:host parameters:params
                    headers:nil
                   progress:^(NSProgress * _Nonnull uploadProgress) {
                       if (progressBlock) {
                           progressBlock(uploadProgress.completedUnitCount,
                                         uploadProgress.totalUnitCount);
                       }
                   } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                  
                       if (successBlock) {
                           successBlock(responseObject);
                       }
                      
                       if ([[self allTasks] containsObject:session]) {
                           [[self allTasks] removeObject:session];
                       }
                   } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
              
                       if (failBlock) failBlock(error);
                       [[self allTasks] removeObject:session];
                       
                   }];
    // 处理同一请求
    if ([self haveSameRequestInTasksPool:session] && !refresh) {
        [session cancel];
        return session;
    }else {
        URLSessionTask *oldTask = [self cancleSameRequestInTasksPool:session];
        if (oldTask) [[self allTasks] removeObject:oldTask];
        if (session) [[self allTasks] addObject:session];
        [session resume];
        return session;
    }
}

+ (NSMutableArray *)allTasks {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (requestTasksPool == nil) requestTasksPool = [NSMutableArray array];
    });
    return requestTasksPool;
}

+ (NSArray *)currentRunningTasks {
    if ([self allTasks].count) {
        return [[self allTasks] copy];
    }
    return [NSMutableArray new];
}

@end

@interface NSURLRequest (decide)

// 判断是否是同一个请求（依据是请求url和参数是否相同）
- (BOOL)isTheSameRequest:(NSURLRequest *)request;

@end

@implementation NSURLRequest (decide)

- (BOOL)isTheSameRequest:(NSURLRequest *)request {
    if ([self.HTTPMethod isEqualToString:request.HTTPMethod]) {
        if ([self.URL.absoluteString isEqualToString:request.URL.absoluteString]) {
            if ([self.HTTPMethod isEqualToString:@"GET"]||[self.HTTPBody isEqualToData:request.HTTPBody]) {
                return YES;
            }
        }
    }
    return NO;
}

@end

@implementation AuthorRequest (RequestManager)

+ (BOOL)haveSameRequestInTasksPool:(URLSessionTask *)task {
    __block BOOL isSame = NO;
    [[self currentRunningTasks] enumerateObjectsUsingBlock:^(URLSessionTask *obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([task.originalRequest isTheSameRequest:obj.originalRequest]) {
            isSame  = YES;
            *stop = YES;
        }
    }];
    return isSame;
}

+ (URLSessionTask *)cancleSameRequestInTasksPool:(URLSessionTask *)task {
    __block URLSessionTask *oldTask = nil;
    
    [[self currentRunningTasks] enumerateObjectsUsingBlock:^(URLSessionTask *obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([task.originalRequest isTheSameRequest:obj.originalRequest]) {
            if (obj.state == NSURLSessionTaskStateRunning) {
                [obj cancel];
                oldTask = obj;
            }
            *stop = YES;
        }
    }];
    return oldTask;
}

@end

import { HttpInterceptorFn } from '@angular/common/http';
import { UserManagmentService } from './user-managment.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userService=inject(UserManagmentService);
  
  const noAuthUrls = ['/signIn', '/singUp']; 
  const isNoAuthRequest = noAuthUrls.some(url => req.url.includes(url));
  if (isNoAuthRequest || !userService.isLoggedIn()) {
    return next(req);
  }
  return userService.user.pipe(take(1), exhaustMap(user => {
            const authReq = req.clone({
                // todo add token to headers
              // headers: req.headers.set('Authorization', "Bearer "+user.token)
            });
            return next(authReq);
        }));
  
};

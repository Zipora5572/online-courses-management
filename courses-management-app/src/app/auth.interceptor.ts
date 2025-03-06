import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = inject(AuthService).getToken();
  if (!req.url.includes('/login') && !req.url.includes('/register')) {
    if (authToken) {
 
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
  }
  return next(req); 
};

import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const {apiURL} = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith(API)) {
    req = req.clone({
      url: req.url.replace(API, apiURL),
      withCredentials: true,
    })
  }

  const errorMsgService = inject(ErrorMsgService);
  const router = inject(Router);
  
  errorMsgService.setError(null);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        router.navigate(['/home']);
      }else if (err.status === 403) {
        errorMsgService.setError(err);
        router.navigate(['/login']);
      } else {
        errorMsgService.setError(err);
        router.navigate(['/error']);
      }

      return [err];
    })
  );
};
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

/**
 * Attaches the admin JWT to protected (/admin/) requests, except the login call.
 * If a protected request comes back 401 (e.g. the token expired), logs the admin
 * out and sends them back to the login screen instead of failing silently.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.token();
  const isProtected = req.url.includes('/admin/') && !req.url.endsWith('/login');

  if (token && isProtected) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 && isProtected) {
        auth.logout();
        router.navigate(['/admin']);
      }
      return throwError(() => err);
    }),
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return next(req);
    }

    req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                AuthService.logout();
            }

            return throwError(() => error);
        })
    );
};

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if (inject(AuthService).isLoggedIn) {
        return true;
    }

    return router.createUrlTree(['/login']);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const premiumGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    if (inject(AuthService).isPremium) {
        return true;
    }

    return router.createUrlTree(['/login']);
};

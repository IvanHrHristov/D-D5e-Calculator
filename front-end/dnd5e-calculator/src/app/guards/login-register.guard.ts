import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.check('auth')) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};

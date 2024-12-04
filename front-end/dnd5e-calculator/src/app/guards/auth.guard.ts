import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";
import { map, take } from "rxjs";
import { CookieService } from 'ngx-cookie-service';


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const cookieService = inject(CookieService);
    const router = inject(Router);

    if (cookieService.check('auth')) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}




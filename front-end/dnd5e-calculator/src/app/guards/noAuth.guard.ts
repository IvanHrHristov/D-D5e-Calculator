import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../user/user.service";
import { map, take } from "rxjs";

export const NoAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.user$.pipe(
        take(1),
        map(user => {
            console.log(user);

            if (!user) {
                return true;
            } else {
                router.navigate(['/home']);
                return false;
            }
        })
    );
}
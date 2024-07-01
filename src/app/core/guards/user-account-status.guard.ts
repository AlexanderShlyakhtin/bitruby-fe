import {CanActivateFn, GuardResult, Router, UrlTree} from '@angular/router';
import {AuthClientService} from "../auth/auth-client.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";

export const userAccountStatusGuard: CanActivateFn = (route, state) => {
  const authClientService = inject(AuthClientService);
  const router = inject(Router);

    return authClientService.getUserLevel().pipe(
        map(value => {
            if (value !== null) {
                return true
            } else {
                router.createUrlTree(['/']);
                return false;
            }
        })
    );
};

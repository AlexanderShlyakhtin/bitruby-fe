import {CanActivateFn, Router} from '@angular/router';
import {AuthClientService} from "../auth/auth-client.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";

export const userAccountLevelGuard: CanActivateFn = (route, state) => {
  const authClientService = inject(AuthClientService);
  const router = inject(Router);

    return authClientService.getUserLevel().pipe(
        map(value => {
            if (value === null ) {
                router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        })
    );
};

import {CanActivateFn, GuardResult, Router} from '@angular/router';
import {AuthClientService} from "../auth/auth-client.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";

export const userAccountStatusGuard: CanActivateFn = (route, state) => {
  const authClientService = inject(AuthClientService);
  const router = inject(Router);

  return authClientService.getUserLevel().pipe(
      map(value => {

          debugger;
        if (value === '2') {
          return true;
        } else if (value === '0' || value === '1') {
          router.navigate(['/account/welcome']);
          return false;
        } else {
          router.navigate(['/']);
          return false;
        }
      })
  );
};

import {CanActivateFn, GuardResult, Router} from '@angular/router';
import {AuthClientService} from "../auth/auth-client.service";
import {inject} from "@angular/core";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authClientService = inject(AuthClientService);
  const router = inject(Router);

  return authClientService.authenticated().pipe(
      map(value => {
        if (value) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      })
  );
};

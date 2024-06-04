import {inject} from "@angular/core";
import {HttpInterceptorFn} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {environment} from "../../../environments/environment.development";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {

    const authService = inject(OidcSecurityService);

    if (
        (
            request.urlWithParams.includes(environment.usersServiceUrl)
        )
        &&
        (!request.urlWithParams.includes("/public"))
    ) {
        authService.getAccessToken().subscribe(token => {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            })
        })
    }
    return next(request);

}

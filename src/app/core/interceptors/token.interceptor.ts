import {inject} from "@angular/core";
import {HttpInterceptorFn} from "@angular/common/http";
import {OidcSecurityService} from "angular-auth-oidc-client";
import { Buffer } from "buffer";
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
    } else if (request.urlWithParams.includes(environment.authServiceUrl))
        {
            const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${encode(environment.auth.clientId+":"+environment.auth.client_secret)}`,
                },

            })
    }
    return next(request);

}

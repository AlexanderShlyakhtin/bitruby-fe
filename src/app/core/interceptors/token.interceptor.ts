import {inject} from "@angular/core";
import {HttpInterceptorFn} from "@angular/common/http";
import {Buffer} from "buffer";
import {environment} from "../../../environments/environment.development";
import {AuthClientService} from "../auth/auth-client.service";

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthClientService);

    if (
        request.urlWithParams.includes(environment.usersServiceUrl) &&
        !request.urlWithParams.includes("/public")
    ) {
        const token = authService.getAccessTokenFn()!;
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
        })
        return next(request)
    } else if (request.urlWithParams.includes(environment.authServiceUrl)) {
        const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${encode(environment.auth.clientId + ":" + environment.auth.client_secret)}`
            }
        });
        return next(request);
    }
    return next(request);

}

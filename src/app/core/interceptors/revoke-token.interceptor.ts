import {HttpInterceptorFn} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";


export const revokeTokenInterceptor: HttpInterceptorFn = (req, next) => {
    if(req.urlWithParams.endsWith("oauth2/revoke")) {
        const updatedRequest = req.clone({
        body: `${req.body}&client_secret=${environment.auth.client_secret}`,
        });
        return next(updatedRequest);
    }
    return next(req);


};

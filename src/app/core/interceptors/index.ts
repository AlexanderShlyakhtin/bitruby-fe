import {HttpInterceptorFn} from "@angular/common/http";
import {revokeTokenInterceptor} from "./revoke-token.interceptor";
import {authInterceptor} from "angular-auth-oidc-client";
import {tokenInterceptor} from "./token.interceptor";


export const httpInterceptorProviders: HttpInterceptorFn[] = [
  authInterceptor(),
  revokeTokenInterceptor,
  tokenInterceptor,
];

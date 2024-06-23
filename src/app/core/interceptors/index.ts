import {HttpInterceptorFn} from "@angular/common/http";
import {revokeTokenInterceptor} from "./revoke-token.interceptor";
import {tokenInterceptor} from "./token.interceptor";


export const httpInterceptorProviders: HttpInterceptorFn[] = [
  revokeTokenInterceptor,
  tokenInterceptor,
];

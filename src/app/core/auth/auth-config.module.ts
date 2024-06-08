import {NgModule} from '@angular/core';
import {AuthModule, LogLevel, PassedInitialConfig} from "angular-auth-oidc-client";
import {environment} from "../../../environments/environment.development";

export const authConfigModule: PassedInitialConfig = {
  config: {
    // triggerAuthorizationResultEvent: true,
    postLoginRoute: '/',
    forbiddenRoute: '/login',
    unauthorizedRoute: '/login',
    logLevel: LogLevel.Debug,
    historyCleanupOff: true,
    authority: environment.auth.authority,
    redirectUrl: environment.auth.redirectUri,
    postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
    clientId: environment.auth.clientId,
    scope: environment.auth.scope, // 'openid profile offline_access ' + your scopes
    responseType: environment.auth.responseType,
    silentRenew: environment.auth.silentRenew,
    useRefreshToken: environment.auth.useRefreshToken,

    autoUserInfo: environment.auth.autoUserInfo,
    customParamsCodeRequest: {
      client_secret: environment.auth.client_secret
    },
    customParamsRefreshTokenRequest: {
      client_secret: environment.auth.client_secret
    },
  }
}

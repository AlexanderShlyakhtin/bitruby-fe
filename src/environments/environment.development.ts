import {LogLevel} from "angular-auth-oidc-client";

export const environment = {
  production: false,
  usersServiceUrl: "http://127.0.0.1:8081/users",
  atuhServiceUrl: "http://auth-server:9000/auth",
  auth: {
    authority: 'http://auth-server:9000/auth',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'client',
    scope: 'openid offline_access', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    autoUserInfo: false,
    client_secret: 'secret',
    logLevel: LogLevel.Error,
  }
};

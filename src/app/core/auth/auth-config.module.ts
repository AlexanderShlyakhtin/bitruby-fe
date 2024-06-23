import {environment} from "../../../environments/environment.development";

export interface AuthConfigModule {
  postLoginRoute?: string;
  postLogoutRedirectUri?: string;
  authority: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  silentRenew: boolean;
}

export const authConfigModule: AuthConfigModule = {
   authority: environment.auth.authority,
   clientId: environment.auth.clientId,
   clientSecret: environment.auth.client_secret,
   scope: environment.auth.scope,
   postLoginRoute: '/',
   postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
   silentRenew: environment.auth.silentRenew
}

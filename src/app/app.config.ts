import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpInterceptorProviders} from "./core/interceptors";
import {AuthApiConfigModule} from "./core/api-config/api-auth/auth-api-config.module";
import {UsersApiConfigModule} from "./core/api-config/api-users/users-api-config.module";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(
          routes
      ),
      provideAnimationsAsync(),
      provideHttpClient(
          withInterceptors(httpInterceptorProviders)
      ),
      importProvidersFrom([AuthApiConfigModule, UsersApiConfigModule])

  ]
};

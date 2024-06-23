import {NgModule} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {ApiModule} from "../../api/v1/auth/api.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.authServiceUrl })
  ],
})
export class AuthApiConfigModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from "../../../../environments/environment.development";
import {ApiModule} from "../../api/v1/auth/api.module";
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from '../../../app.component';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.authServiceUrl })
  ],
})
export class AuthApiConfigModule { }

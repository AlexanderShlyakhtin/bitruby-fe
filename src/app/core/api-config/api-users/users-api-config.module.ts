import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {environment} from "../../../../environments/environment.development";
import {ApiModule} from "../../api/v1/users/api.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule.forRoot({ rootUrl: environment.usersServiceUrl })
  ]
})
export class UsersApiConfigModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {routes} from "./logn.routes";
import {AuthApiConfigModule} from "../../core/api-config/api-auth/auth-api-config.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class LoginModule {
}

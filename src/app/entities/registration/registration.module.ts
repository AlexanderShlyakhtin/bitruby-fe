import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {RegistrationComponent} from "./registration.component";
import {routes} from "./registration.routes";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forChild(routes)
  ]
})
export class RegistrationModule { }

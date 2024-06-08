import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {RegistrationComponent} from "./registration.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forChild([
        {
          path: '',
          component: RegistrationComponent
        }
      ])
  ]
})
export class RegistrationModule { }

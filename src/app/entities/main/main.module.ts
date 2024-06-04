import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LandingComponent} from "../landing/landing.component";
import {routes} from "./main.routes";

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      LandingComponent
  ]
})
export class MainModule { }

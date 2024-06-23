import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PlaygroundComponent} from "./playground.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      RouterModule.forChild([{
        path: '',
        component: PlaygroundComponent
      }])
  ]
})
export class PlaygroundModule { }

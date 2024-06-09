import {Component} from '@angular/core';
import {ToolbarComponent} from "../../layouts/toolbar/toolbar.component";
import {RouterOutlet} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'bitruby-main',
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterOutlet,
    SharedModule
  ],
  template: `
    <bitruby-logo></bitruby-logo>
    <bitruby-toolbar></bitruby-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [

  ]
})
export class MainComponent {

}

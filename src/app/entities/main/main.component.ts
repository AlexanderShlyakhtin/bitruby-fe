import {Component} from '@angular/core';
import {ToolbarComponent} from "../../layouts/toolbar/toolbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'bitruby-main',
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterOutlet
  ],
  template: `
    <bitruby-toolbar></bitruby-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [

  ]
})
export class MainComponent {

}

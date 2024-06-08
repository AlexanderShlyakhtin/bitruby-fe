import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ApiModule} from "./core/api/v1/auth/api.module";
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
      ``
  ],
  imports: [RouterOutlet],
  standalone: true
})
export class AppComponent {
  title = 'bitruby-frontend';
}

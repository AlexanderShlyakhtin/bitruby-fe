import {Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {BigRedButtonComponent} from "../../shared/buttons/big-red-button.component";

@Component({
  selector: 'bitruby-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButton,
    BigRedButtonComponent
  ],
  template: `
    <mat-toolbar>
      <div class="spacer"></div>
      <div class="button-container">
        <button mat-flat-button>{{ mapLabel['button1'] }}</button>
        <button mat-flat-button>{{ mapLabel['button2'] }}</button>
        <button mat-flat-button>{{ mapLabel['button3'] }}</button>
        <button mat-flat-button>{{ mapLabel['button4'] }}</button>
      </div>
      <span class="spacer"></span>
      <bitruby-big-red-button-component
          [text]="mapLabel['login']"
          (outputAction)="navigateToLogin()"
      ></bitruby-big-red-button-component>
    </mat-toolbar>
  `,
  styles: [`
    
    .button-container {
      display: flex;
      gap: 10px;
    }

    .spacer {
      flex: 1;
    }

    
  `]
})
export class ToolbarComponent {

  mapLabel = {
    button1: 'Купить крипто',
    button2: 'Трейдинг',
    button3: 'Вики',
    button4: 'Еще',
    login: 'Вход и Регистрация',
  }

  constructor(
      private router: Router
  ) {
  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }
}

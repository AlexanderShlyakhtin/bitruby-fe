import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'bitruby-login-by-qr',
  standalone: true,
  imports: [
    MatButton
  ],
  template: `
    <div class="row">
      <div class="col-md-10 command-panel">
        <button mat-flat-button color="warn" (click)="login()">Продолжить</button>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class LoginByQrComponent {

  constructor(
  ) {
  }


  login(): void {
  }

}

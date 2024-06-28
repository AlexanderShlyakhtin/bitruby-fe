import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {BigRedButtonComponent} from "../../shared/buttons/big-red-button.component";
import {AuthClientService} from "../../core/auth/auth-client.service";
import {Observable, Subscription} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'bitruby-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButton,
    BigRedButtonComponent,
    NgIf
  ],
  template: `
    <mat-toolbar style="background: #4C1C67;">
      <div class="spacer"></div>
      <div class="button-container">
        <button mat-button style="color: white">{{ mapLabel['button1'] }}</button>
        <button mat-button style="color: white">{{ mapLabel['button2'] }}</button>
        <button mat-button style="color: white">{{ mapLabel['button3'] }}</button>
        <button mat-button style="color: white">{{ mapLabel['button4'] }}</button>
      </div>
      <span class="spacer"></span>
      <div *ngIf="accessToken === null; else token">
        <bitruby-big-red-button-component
            [text]="mapLabel['login']"
            (outputAction)="navigateToLogin()"
        ></bitruby-big-red-button-component>
      </div>
      <ng-template #token>
        <bitruby-big-red-button-component
            [text]="mapLabel['account']"
            (outputAction)="navigateToAccount()"
        ></bitruby-big-red-button-component>
      </ng-template>
      
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
export class ToolbarComponent implements OnInit {

  mapLabel = {
    button1: 'Купить крипто',
    button2: 'Трейдинг',
    button3: 'Вики',
    button4: 'Еще',
    login: 'Вход и Регистрация',
    account: 'Аккаунт',
  }

  sub!: Subscription;
  accessToken: string | null = null;

  constructor(
      private router: Router,
      private authClientService: AuthClientService
  ) {

  }

  ngOnInit(): void {
    this.sub = this.authClientService.getAccessToken()
        .subscribe({
          next: value => {
            this.accessToken = value;
          }
        })
  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }

  navigateToAccount() {
    this.router.navigate(['/account'])
  }
}

import {Injectable} from '@angular/core';
import {AuthService} from "../api/v1/auth/services/auth.service";
import {authConfigModule} from "./auth-config.module";
import {GrantType} from "../api/v1/auth/models/grant-type";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Token} from "../api/v1/auth/models/token";

@Injectable({
    providedIn: 'root'
})
export class AuthClientService {
    private clientId: string;
    private clientSecret: string;
    private authority: string;
    private scope: string;
    private postLoginRoute: string = '/';
    private postLogoutRedirectUri: string = '/';
    private silentRenew: boolean;

    userLevel!: string;
    accessToken!: string;
    refreshToken!: string;
    expiresIn!: number;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.clientId = authConfigModule.clientId;
        this.clientSecret = authConfigModule.clientSecret;
        this.authority = authConfigModule.authority;
        this.scope = authConfigModule.scope;
        this.postLoginRoute = authConfigModule.postLoginRoute!;
        this.postLogoutRedirectUri = authConfigModule.postLogoutRedirectUri!;
        this.silentRenew = authConfigModule.silentRenew;
    }

    authorize(userName: string, password: string, otp: string, grantType: GrantType): void {
        this.authService.getTokenByUserPassword(
            {
                body: {
                    scope: authConfigModule.scope,
                    otp: otp,
                    password: password,
                    username: userName,
                    grant_type: grantType,
                }
            }
        ).subscribe({
            next: value => {
                this.setToken(value);
            },
            error: err => {
                console.error("Error occurs while trying authorize the user: ", err);
            },
            complete: () => {
                this.router.navigate([this.postLoginRoute])
            }
        })
    }

    private refreshAccessToken(): void {
        this.authService.getTokenByUserPassword({refresh_token: this.refreshToken, grant_type: "refresh_token"})
            .subscribe({
                next: value => {
                    this.setToken(value);
                },
                error: err => {
                    console.error("Error occurs while trying refresh access token: ", err);
                },
            })
    }

    getUserLevel(): Observable<string> {
        return of(this.userLevel)
    }

    getAccessToken(): Observable<string> {
        return of(this.accessToken);
    }


    private base64UrlDecode(str: string): string {
        // Replace non-url compatible chars with base64 standard chars
        str = str.replace(/-/g, '+').replace(/_/g, '/');

        // Pad the base64 string if it's not a multiple of 4
        while (str.length % 4) {
            str += '=';
        }

        return atob(str);
    }

    private setToken(value: Token) {
        this.accessToken = value.access_token;
        this.refreshToken = value.refresh_token;
        this.expiresIn = value.expires_in;

        try {
            const payload = this.accessToken.split('.')[1];
            const decodedPayload = this.base64UrlDecode(payload);
            const parse = JSON.parse(decodedPayload);
            this.userLevel = parse?.level;

        } catch (error) {
            console.error('Invalid JWT token', error);
        }

    }
}

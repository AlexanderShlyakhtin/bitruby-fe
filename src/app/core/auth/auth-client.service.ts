import {Injectable} from '@angular/core';
import {authConfigModule} from "./auth-config.module";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {v4 as uuidv4} from "uuid";

import {SessionStorageService} from "../services/session-storage.service";
import {ACCESS_TOKEN, EXPIRES_IN, REFRESH_TOKEN} from "../../app.constants";
import {AuthService} from "../api/v1/auth/services/auth.service";
import {Token} from "../api/v1/auth/models/token";
import {GrantType as GrantTypeAuth} from "../api/v1/auth/models/grant-type";
import {Error} from "../api/v1/auth/models/error";
import {GrantType as GrantTypeUsers} from "../api/v1/users/models/grant-type";
import {Base} from "../api/v1/users/models/base";
import {RestorePasswordRequestOtpResult} from "../api/v1/users/models/restore-password-request-otp-result";
import {IntrospectToken} from "../api/v1/auth/models/introspect-token";
import {RestorePasswordService} from "../api/v1/users/services/restore-password.service";
import {RegistrationService} from "../api/v1/users/services/registration.service";
import {OtpLoginResult} from "../api/v1/auth/models/otp-login-result";
import {MatSnackBar} from "@angular/material/snack-bar";

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

    constructor(
        private authService: AuthService,
        private router: Router,
        private restorePasswordService: RestorePasswordService,
        private registrationService: RegistrationService,
        private sessionStorageService: SessionStorageService,
        private _snackBar: MatSnackBar
    ) {
        this.clientId = authConfigModule.clientId;
        this.clientSecret = authConfigModule.clientSecret;
        this.authority = authConfigModule.authority;
        this.scope = authConfigModule.scope;
        this.postLoginRoute = authConfigModule.postLoginRoute!;
        this.postLogoutRedirectUri = authConfigModule.postLogoutRedirectUri!;
        this.silentRenew = authConfigModule.silentRenew;
    }

    authorize(userName: string, password: string, otp: string, loginId: string, grantType: GrantTypeAuth): void {
        this.authService.getTokenByUserPassword(
            {
                body: {
                    scope: authConfigModule.scope,
                    otp: otp,
                    password: password,
                    username: userName,
                    grant_type: grantType,
                    loginId: loginId
                }, "x-request-id": uuidv4()
            }
        ).subscribe({
            next: (value: Token) => {
                this.setToken(value);
            },
            error: err => {
                this._snackBar.open(err['error'].message, 'Close', {verticalPosition: 'top', direction: 'rtl', duration: 3000 })
                console.error("Error occurs while trying authorize the user: ", err);
            },
            complete: () => {
                this.router.navigate([this.postLoginRoute])
            }
        })
    }

    generateOtpLogin(username: string, password: string, grantType: GrantTypeUsers): Observable<OtpLoginResult> {
        return this.authService.generateOtpCodeForLogin({body: {
                sendTo: username,
                password: password,
                grant_type: grantType,
            }, "x-request-id": uuidv4()
        })
    }

    generateOtpRegistration(registrationId: string): Observable<Base> {
        return this.registrationService.generateOtpCodeForRegistration({body: {
                registrationId: registrationId,
            }, "x-request-id": uuidv4()
        })
    }

    generateOtpRestorePassword(username: string, grantType: GrantTypeUsers): Observable<RestorePasswordRequestOtpResult> {
        return this.restorePasswordService.generateOtpCodeForRestoringPassword({body: {
                sendTo: username,
                grant_type: grantType,
            }, "x-request-id": uuidv4()
        })
    }

    private refreshAccessToken(): void {
        this.authService.getTokenByUserPassword({
            body: {
                refresh_token: this.sessionStorageService.getItem(REFRESH_TOKEN),
                grant_type: GrantTypeAuth.RefreshToken
        }, "x-request-id": uuidv4()
            })
            .subscribe({
                next: (value: Token) => {
                    this.setToken(value);
                },
                error: (err: Error) => {
                    console.error("Error occurs while trying refresh access token: ", err);
                },
            })
    }

    getUserLevel(): Observable<string | null> {
        let userLevel: string | null = null;
        try {
            if(!this.getAccessTokenFromStorage() !== null) {
                const payload = this.getAccessTokenFromStorage()!.split('.')[1];
                const decodedPayload = this.base64UrlDecode(payload);
                const parse = JSON.parse(decodedPayload);
                userLevel = parse?.level;
            }
        } catch (error) {
            console.error('Invalid JWT token', error);
        }
        return of(userLevel)
    }

    introspectToken(): Observable<IntrospectToken> {
        const token = this.getAccessTokenFromStorage();
        if(token === null) {
            return of({active: false} as IntrospectToken);
        }
        return this.authService.introspectAccessToken({
            body: {
                token: token
            }, "x-request-id": uuidv4()
        })
    }

    private getAccessTokenFromStorage(): string | null {
        return this.sessionStorageService.getItem(ACCESS_TOKEN);
    }

    authenticated(): Observable<boolean> {
        if(this.getAccessTokenFromStorage() === null) {
            return of(false);
        }
        else {
            return of(true)
        }
    }

    getAccessToken(): Observable<string | null> {
        return of(this.getAccessTokenFromStorage());
    }

    getAccessTokenFn(): string | null {
        return this.getAccessTokenFromStorage();
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
        this.sessionStorageService.setItem(ACCESS_TOKEN, value.access_token)
        this.sessionStorageService.setItem(REFRESH_TOKEN, value.refresh_token)
        this.sessionStorageService.setItem(EXPIRES_IN, value.expires_in)



    }


}

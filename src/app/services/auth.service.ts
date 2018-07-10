import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientId,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    audience: 'https://socius-mms.au.auth0.com/userinfo',
    redirectUri: environment.auth0.callbackURL,
    scope: 'openid profile'
  });

  constructor(public routeHelper: Router, private toastr: ToastrService) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuth(): void {
    this.auth0.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.routeHelper.navigate(['/dashboard']);
      } else if(err) {
        console.log(err);
      }
    })
  }

  private setSession(aAuthResult): void {
    const expiresAt = JSON.stringify((aAuthResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', aAuthResult.accessToken);
    localStorage.setItem('id_token', aAuthResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // localStorage.setItem('user_name', aAuth)
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.routeHelper.navigate(['/login']);
    this.toastr.success('You have successfully logged out.','',{
      positionClass: 'toast-top-full-width'
    });
  }

  public isAuthed(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}

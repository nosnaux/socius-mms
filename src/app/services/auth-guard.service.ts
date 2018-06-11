import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public routeHelper: Router) { }

  canActivate(): boolean {
    if(!this.auth.isAuthed()) {
      this.routeHelper.navigate(['login']);
      return false;
    }
    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService, private routeHelper: Router) { }

  ngOnInit() {
    if(this.auth.isAuthed()) {
      this.routeHelper.navigate(['dashboard']);
    }
  }

  public beginAuth(): void {
    this.auth.login();
  }

}

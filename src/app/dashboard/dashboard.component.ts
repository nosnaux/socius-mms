import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.processSidebar();
  }

  private processSidebar(): void {
    var loc = (window.location.href).split("\/");
    if(loc[4] == "member") {
      $("#sidebar > li#members").addClass("active");
    } else {
      $("#sidebar > li#" + loc[4]).addClass("active");
    }
    $("#sidebar > li").click(function(){
      $("#sidebar > li").removeClass("active");
      $(this).addClass("active");
    });
  }

  public logoff(): void {
    this.auth.logout();
  }

}

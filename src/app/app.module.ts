import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRouterModule } from './app.routing';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MembersComponent } from './dashboard/members/members.component';
import { MemberComponent } from './dashboard/member/member.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { AttendanceComponent } from './dashboard/attendance/attendance.component';
import { AdministrationComponent } from './dashboard/administration/administration.component';
import { ToolsComponent } from './dashboard/tools/tools.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    MembersComponent,
    MemberComponent,
    PaymentsComponent,
    AttendanceComponent,
    AdministrationComponent,
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

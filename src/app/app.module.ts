import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Routing
import { AppRouterModule } from './app.routing';

// Auth
import { AuthService } from './services/auth.service';

//Pipe
import { FullMemberTypePipe } from './pipes/membershiptype.pipe';
import { CapatalizePipe } from './pipes/capatalize.pipe';
import { PaymentTypeToFullPipe } from './pipes/paymenttype.pipe';


// services
import { MembersService } from './services/members.service';
import { PaymentsService } from './services/payments.service';

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
    ToolsComponent,
    FullMemberTypePipe,
    CapatalizePipe,
    PaymentTypeToFullPipe
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

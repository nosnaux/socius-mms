import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

// Main Components
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Child Dashboard Components
import { AdministrationComponent } from './dashboard/administration/administration.component';
import { AttendanceComponent } from './dashboard/attendance/attendance.component';
import { HomeComponent } from './dashboard/home/home.component';
import { MemberComponent } from './dashboard/member/member.component';
import { MembersComponent } from './dashboard/members/members.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { ToolsComponent } from './dashboard/tools/tools.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'administration',
        component: AdministrationComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'member/:memberid',
        component: MemberComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'tools',
        component: ToolsComponent
      },
    ]
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouterModule {}

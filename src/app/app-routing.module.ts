import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {LandingComponent} from './components/landing/landing.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {
  AuthGuardService, DemoGraphic,
  Lectures,
  LoggedInService,
  PostTest,
  PreTest,
  PreTestGiven,
  Result
} from './services/auth-guard/auth-guard.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PretestComponent} from './components/pretest/pretest.component';
import {PosttestComponent} from './components/posttest/posttest.component';
import {ResultComponent} from './components/result/result.component';
import {LecturesComponent} from './components/lectures/lectures.component';
import {DemographicComponent} from './components/demographic/demographic.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate:[LoggedInService] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoggedInService] },
  { path:'dashboard', component: DashboardComponent, canActivate:[AuthGuardService], children:[
      {
        path:'', redirectTo:'demographic', pathMatch:'prefix'
      },
      {
        path:'demographic', component:DemographicComponent, canActivate:[DemoGraphic]
      },
      {
        path:'pretest', component:PretestComponent, canActivate:[PreTest]
      },
      {
        path:'posttest', component: PosttestComponent, canActivate:[PreTestGiven, PostTest]
      },
      {
        path:'lectures', component: LecturesComponent, canActivate:[Lectures]
      },
      {
        path:'result', component: ResultComponent, canActivate:[Result]
      }
    ]},
  { path: 'resetPassword', component: ResetPasswordComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

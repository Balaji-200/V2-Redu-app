import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {SceneOneComponent} from './components/lectures/scenarios/scene-one/scene-one.component';
import {ExplainerComponent} from './components/lectures/explainer/explainer.component';
import {SceneTwoComponent} from './components/lectures/scenarios/scene-two/scene-two.component';
import {SceneThreeComponent} from './components/lectures/scenarios/scene-three/scene-three.component';
import {SceneFourComponent} from './components/lectures/scenarios/scene-four/scene-four.component';
import {SceneFiveComponent} from './components/lectures/scenarios/scene-five/scene-five.component';

const routes: Routes = [
  {path: '', component: LandingComponent, canActivate: [LoggedInService]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInService]},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      {
        path: '', redirectTo: 'demographic', pathMatch: 'prefix'
      },
      {
        path: 'demographic', component: DemographicComponent, canActivate: [DemoGraphic]
      },
      {
        path: 'pretest', component: PretestComponent, canActivate: [PreTest]
      },
      {
        path: 'posttest', component: PosttestComponent, canActivate: [PreTestGiven, PostTest]
      },
      {
        path: 'result', component: ResultComponent, canActivate: [Result]
      }
    ]
  },
  {
    path: 'lectures', component: LecturesComponent, canActivate: [Lectures],
    children: [
      {
        path: '', redirectTo: 'explainer', pathMatch: 'prefix'
      },
      {
        path: 'explainer', component: ExplainerComponent
      },
      {
        path: 'scene1', component: SceneOneComponent
      },
      {
        path: 'scene2', component: SceneTwoComponent
      },
      {
        path: 'scene3', component: SceneThreeComponent
      },
      {
        path: 'scene4', component: SceneFourComponent
      },
      {
        path: 'scene5', component: SceneFiveComponent
      }
    ]
  },
  {path: 'resetPassword', component: ResetPasswordComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

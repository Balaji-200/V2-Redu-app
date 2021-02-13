import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatLineModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {SignupComponent} from './components/signup/signup.component';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {PretestComponent} from './components/pretest/pretest.component';
import { PosttestComponent } from './components/posttest/posttest.component';
import { ResultComponent } from './components/result/result.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { SuccessDialogComponent } from './components/reset-password/success-dialog/success-dialog.component';
import { ConfirmDialogComponent } from './components/lectures/confirm-dialog/confirm-dialog.component';
import { DemographicComponent } from './components/demographic/demographic.component';
import { SceneOneComponent } from './components/lectures/scenarios/scene-one/scene-one.component';
import { ExplainerComponent } from './components/lectures/explainer/explainer.component';
import { SceneTwoComponent } from './components/lectures/scenarios/scene-two/scene-two.component';
import { SceneThreeComponent } from './components/lectures/scenarios/scene-three/scene-three.component';
import { SceneFourComponent } from './components/lectures/scenarios/scene-four/scene-four.component';
import { SceneFiveComponent } from './components/lectures/scenarios/scene-five/scene-five.component';
import { QuestionDialogComponent } from './components/lectures/question-dialog/question-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    LandingComponent,
    DashboardComponent,
    ResetPasswordComponent,
    PretestComponent,
    PosttestComponent,
    ResultComponent,
    LecturesComponent,
    SuccessDialogComponent,
    ConfirmDialogComponent,
    DemographicComponent,
    SceneOneComponent,
    ExplainerComponent,
    SceneTwoComponent,
    SceneThreeComponent,
    SceneFourComponent,
    SceneFiveComponent,
    QuestionDialogComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatLineModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

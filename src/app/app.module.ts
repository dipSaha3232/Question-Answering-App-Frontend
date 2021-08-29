import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { StudentGuardService } from './student-guard.service';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPanelComponent,
    StudentPanelComponent,
    RegisterComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    RegisterService,
    AuthGuardService,
    AdminGuardService,
    StudentGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

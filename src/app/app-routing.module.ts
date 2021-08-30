import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin-guard.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuardService } from './auth-guard.service';
import { CorrectAnswerComponent } from './correct-answer/correct-answer.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { RegisterComponent } from './register/register.component';
import { StudentGuardService } from './student-guard.service';
import { StudentPanelComponent } from './student-panel/student-panel.component';

const routes: Routes = [
  { path : '', redirectTo : 'login', pathMatch : 'full'},
  { path : 'login', component : LoginComponent},
  { path : 'admin-panel', component : AdminPanelComponent, canActivate : [AuthGuardService,AdminGuardService]},
  { path : 'student-panel', component : StudentPanelComponent, canActivate : [AuthGuardService,StudentGuardService]},
  { path : 'register', component : RegisterComponent },
  { path : 'add-question', component : QuestionComponent},
  { path : 'correct-answers', component : CorrectAnswerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

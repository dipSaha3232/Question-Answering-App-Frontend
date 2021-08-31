import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ContextQuestion } from '../models/context-question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  contextQuestion : ContextQuestion = new ContextQuestion();

  constructor(private questionService : QuestionService,
              private loginService : LoginService,
              private router : Router) { }

  ngOnInit(): void {
  }

  post() : void {

    this.questionService.submitContextQuestion(this.contextQuestion).subscribe(
      response =>{
        if(response)
          alert("Posted Successfully");
        else
          alert("Unable to post");
      }
    )
  }

  logout() : void {
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }

}

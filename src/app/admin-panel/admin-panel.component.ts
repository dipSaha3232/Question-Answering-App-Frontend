import { Component, OnInit } from '@angular/core';
import { ContextQuestion } from '../models/context-question';
import { QuestionService } from '../question.service';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  contextQuestion : ContextQuestion = new ContextQuestion();

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
  }

  post() : void {
    alert(this.contextQuestion.questions);

    this.questionService.submitContextQuestion(this.contextQuestion).subscribe(
      response =>{
        if(response)
          alert("Posted Successfully");
        else
          alert("Unable to post");
      }
    )
  }

}

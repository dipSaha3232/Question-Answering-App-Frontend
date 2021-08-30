import { Component, OnInit } from '@angular/core';
import { ContextQuestion } from '../models/context-question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-correct-answer',
  templateUrl: './correct-answer.component.html',
  styleUrls: ['./correct-answer.component.css']
})
export class CorrectAnswerComponent implements OnInit {

  constructor(private questionService : QuestionService) { }

  correctAnswers : string []= [];
  contextQuestion : ContextQuestion = new ContextQuestion();

  ngOnInit(): void {
    this.displayCorrectAnswers();
    this.getContextQuestion();
  }

  displayCorrectAnswers() : void {
    this.questionService.getCorrectAnswers().subscribe(
      response=>{
        this.correctAnswers=response;
      }
    )
  }

  getContextQuestion() : void {
    this.questionService.getContextQuestion().subscribe(
      response=>{
        this.contextQuestion = response;
      }
    )
  }

}

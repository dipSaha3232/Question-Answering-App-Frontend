import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ContextQuestion } from '../models/context-question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-correct-answer',
  templateUrl: './correct-answer.component.html',
  styleUrls: ['./correct-answer.component.css']
})
export class CorrectAnswerComponent implements OnInit {

  constructor(private questionService : QuestionService,
              private _localStorageService : LocalStorageService) { }

  correctAnswers : string []= [];
  contextQuestion : ContextQuestion = new ContextQuestion();

  ngOnInit(): void {
    this.displayCorrectAnswers();
    this.getContextQuestion();
  }

  displayCorrectAnswers() : void {
    this.questionService.getCorrectAnswers(this._localStorageService.getIndexOfContextQuestion()).subscribe(
      response=>{
        this.correctAnswers=response;
      }
    )
  }

  getContextQuestion() : void {
    this.questionService.getContextQuestion(this._localStorageService.getIndexOfContextQuestion()).subscribe(
      response=>{
        this.contextQuestion = response;
      }
    )
  }

}

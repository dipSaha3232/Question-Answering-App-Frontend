import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private questionService : QuestionService,
              private router : Router) { }

  question : string ="";

  ngOnInit(): void {
    //this.questionService.setQuestion(this.question)
    //this.router.navigate(["admin-panel"]);
  }

}

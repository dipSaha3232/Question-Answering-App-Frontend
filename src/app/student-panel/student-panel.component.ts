import { Component, OnInit } from '@angular/core';
import { ContextQuestion } from '../models/context-question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentPanelComponent implements OnInit {

  contextQuestion : ContextQuestion = new ContextQuestion();
  answer1 : string = "";
  answer2 : string = "";
  answer3 : string = "";

  answers : string[] = [];
  correctAnswersMarks : number [] = [];

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.getContextQuestion();
  }

  getContextQuestion() : void {
    this.questionService.getContextQuestion().subscribe(
      response =>{
        this.contextQuestion = response;
      }
    )
  }

  changeAttributeOfAnswerTextArea(value  : number, id : string) : void{
    if(value == 0)
      document.getElementById(id)?.setAttribute("style", "background-color : red");
    else if(value == 1)
      document.getElementById(id)?.setAttribute("style", "background-color : green");

    document.getElementById(id)?.setAttribute("readonly", "true");
  }

  removeSubmitButton() : void {
    var element = document.getElementById("submit");
    element?.parentNode?.removeChild(element);
  }

  addMarkElement() : void {
    var divElement = document.getElementById("answers");
    const p = document.createElement("p");
    const br = document.createElement("br");
    const hr = document.createElement("hr");
    p.textContent = "Obtained Marks "+this.correctAnswersMarks[3];
    p.setAttribute("style", "background-color : #8F00FF; height : 60px; padding-left : 10px;padding-top : 15px; color : white; font-size: 30px;");


    divElement?.appendChild(br);
    divElement?.appendChild(br);
    divElement?.appendChild(hr);
    divElement?.appendChild(p);
  }

  submit() : void {

    this.answers.push(this.answer1);
    this.answers.push(this.answer2);
    this.answers.push(this.answer3);

    this.questionService.getAnswerMarks(this.answers).subscribe(
      response =>{
        this.correctAnswersMarks = response;

        this.removeSubmitButton();
        this.addMarkElement();

        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[0], "answer1");
        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[1], "answer2");
        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[2], "answer3");
      }
    )
  }

}

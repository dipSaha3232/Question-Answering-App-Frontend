import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageRefService } from '../local-storage-ref.service';
import { LocalStorageService } from '../local-storage.service';
import { LoginService } from '../login.service';
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
  correctAnswers : string[]=[]

  index : number = 0;

  constructor(private questionService : QuestionService,
              private loginService : LoginService,
              private router : Router,
              private _localStorageService : LocalStorageService) { }

  ngOnInit(): void {
    //this.getContextQuestion();
    //this._localStorageService.setIndexOfContextQuestion(this.index);
    //this.questionService.getAllContextQuestion();
    //this.questionService.getAllCorrectAnswers();
    this.getContextQuestion();
  }

  getContextQuestion() : void {
    /*this.questionService.getContextQuestion(this.index).subscribe(
      response =>{
        this.contextQuestion = response;
      }
    )*/

    this.contextQuestion=this._localStorageService.getCurrentContextQuestion()
  }

  changeAttributeOfAnswerTextArea(value  : number, id : string, index : number) : void{
    if(value == 0)
      document.getElementById(id)?.setAttribute("style", "background-color : red");
    else if(value == 1)
      document.getElementById(id)?.setAttribute("style", "background-color : green");

    document.getElementById(id)?.setAttribute("readonly", "true");
    document.getElementById(id)?.setAttribute("placeholder" , "");
    
  }

  backToAttributeOfAnswerTextArea(id : string) : void{
    document.getElementById(id)?.setAttribute("style", "background-color : #fceded");

    document.getElementById(id)?.removeAttribute("readonly")
    document.getElementById(id)?.setAttribute("placeholder" , "Write Your Answer Here");
    let text = document.getElementById(id)?.textContent || ""
    document.getElementById(id)?.textContent?.replace(text,'')
  }

  removeSubmitButton(id : string) : void {
    var element = document.getElementById(id);
    element?.parentNode?.removeChild(element);
  }

  addMarkElement() : void {
    var divElement = document.getElementById("answers");
    const p = document.createElement("p");
    const br = document.createElement("br");
    const hr = document.createElement("hr");
    p.textContent = "Obtained Marks : "+this.correctAnswersMarks[3];
    p.setAttribute("style", " height : 60px; padding-left : 10px;padding-top : 15px; color : white; font-size: 30px;");


    divElement?.appendChild(br);
    divElement?.appendChild(br);
    divElement?.appendChild(hr);
    divElement?.appendChild(p);
  }

  tokenizeAnswer(answer: string) :string[] {
    return answer.split(" ");
  }

  isCorrect(answer : string, correctAnswer : string) : boolean {
    let matchedWord = 0;
    for(let word of this.tokenizeAnswer(answer)) {
      if(this.tokenizeAnswer(correctAnswer).includes(word))
        matchedWord++;
    }

    if((matchedWord*matchedWord)/(this.tokenizeAnswer(correctAnswer).length * this.tokenizeAnswer(answer).length)>=0.7)
      return true;
    return false;
  }

  checkAnswerAccuracy() {
    let mark = 0;
    for(let i=0;i<this.answers.length;i++){
      if(this.isCorrect(this.answers[i].toUpperCase(),this.correctAnswers[i].toUpperCase())){
        mark++;
        this.correctAnswersMarks[i]=1;
      }
      else
        this.correctAnswersMarks[i]=0;
    }
    this.correctAnswersMarks[this.answers.length]=mark
  }

  submit() : void {

    this.answers.push(this.answer1);
    this.answers.push(this.answer2);
    this.answers.push(this.answer3);


    /*this.questionService.getCorrectAnswers(this.index).subscribe(
      response =>{
        this.correctAnswers = response;

        this.checkAnswerAccuracy();

        this.removeSubmitButton("submit");
        this.addMarkElement();

        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[0], "answer1", 0);
        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[1], "answer2", 1);
        this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[2], "answer3", 2);
      }
    )*/

    this.correctAnswers=this._localStorageService.getCurrentCorrectAnswer();
    this.checkAnswerAccuracy();

    this.removeSubmitButton("submit");
    this.addMarkElement();

    this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[0], "answer1", 0);
    this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[1], "answer2", 1);
    this.changeAttributeOfAnswerTextArea(this.correctAnswersMarks[2], "answer3", 2);
  }

  next() : void {
    if(! this._localStorageService.hasNext())
    {
      this.removeSubmitButton("submit1")
      return ;
    }
    this.backToAttributeOfAnswerTextArea("answer1")
    this.backToAttributeOfAnswerTextArea("answer2")
    this.backToAttributeOfAnswerTextArea("answer3")
    this.index = this.index+1
    this._localStorageService.setIndexOfContextQuestion(this.index)
    this.getContextQuestion();
  }



  logout() : void {
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }

}

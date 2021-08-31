import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContextQuestion } from './models/context-question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseurl = "https://localhost:5001/api/";

  constructor(private http : HttpClient) { }

  contextQuestion :ContextQuestion = new ContextQuestion();


  public submitContextQuestion(contextQuestion : ContextQuestion) : Observable<boolean> {
    return this.http.post<boolean>(this.baseurl + "submitContextQuestion", contextQuestion)
  }

  public getContextQuestion() : Observable<ContextQuestion> {
    return this.http.get<ContextQuestion>(this.baseurl+"getContextQuestion");
  }

  public getAnswerMarks(answers : string[]) : Observable<number []>{
    return this.http.post<number []>(this.baseurl + "getAnswerMarks", answers);
  }

  public getCorrectAnswers() : Observable<string []>{
    return this.http.get<string[]>(this.baseurl + "getCorrectAnswers");
  }
}

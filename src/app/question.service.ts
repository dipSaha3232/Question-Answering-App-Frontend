import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ContextQuestion } from './models/context-question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseurl = "https://localhost:5001/api/";

  constructor(private http : HttpClient,
              private _localStorageService : LocalStorageService) { }

  contextQuestion :ContextQuestion = new ContextQuestion();


  public submitContextQuestion(contextQuestion : ContextQuestion) : Observable<boolean> {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return this.http.post<boolean>(this.baseurl + "submitContextQuestion", contextQuestion,{headers})
  }

  public getContextQuestion() : Observable<ContextQuestion> {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return this.http.get<ContextQuestion>(this.baseurl+"getContextQuestion", {headers});
  }

  public getAnswerMarks(answers : string[]) : Observable<number []>{
    return this.http.post<number []>(this.baseurl + "getAnswerMarks", answers);
  }

  public getCorrectAnswers() : Observable<string []>{
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    alert(this._localStorageService.loadInfo())
    return this.http.get<string[]>(this.baseurl + "getCorrectAnswers", {headers});
  }
}

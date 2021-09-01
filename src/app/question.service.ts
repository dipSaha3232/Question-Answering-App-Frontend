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

  private allContextQuestion : ContextQuestion[] = [];
  private allCorrectAnswers : string[][] = []

  constructor(private http : HttpClient,
              private _localStorageService : LocalStorageService) { }

  contextQuestion :ContextQuestion = new ContextQuestion();


  public submitContextQuestion(contextQuestion : ContextQuestion) : Observable<boolean> {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return this.http.post<boolean>(this.baseurl + "submitContextQuestion", contextQuestion,{headers})
  }

  /*public getContextQuestion() : Observable<ContextQuestion> {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return this.http.get<ContextQuestion>(this.baseurl+"getContextQuestion", {headers});
  }*/

  public getContextQuestion(index : number) : Observable<ContextQuestion> {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return of(this.allContextQuestion[this._localStorageService.getIndexOfContextQuestion()])
  }

  public getAllContextQuestion() {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    this.http.get<ContextQuestion[]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allContextQuestion = response;
      }
    );
  }

  /*public getCorrectAnswers() : Observable<string []>{
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return this.http.get<string[]>(this.baseurl + "getCorrectAnswers", {headers});
  }*/

  public getCorrectAnswers(index : number) : Observable<string []>{
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    return of(this.allCorrectAnswers[this._localStorageService.getIndexOfContextQuestion()])
  }

  public getAllCorrectAnswers() {
    const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    this.http.get<string[][]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allCorrectAnswers = response;
      }
    );
  }

  public hasNext() : boolean {
    return this._localStorageService.getIndexOfContextQuestion()<this.allContextQuestion.length-1;
  }
}

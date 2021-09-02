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
    const temp1=new ContextQuestion();
    const temp2=new ContextQuestion();
    const temp3=new ContextQuestion();

    temp1.context="this is context 1"
    temp2.context="this is context 2"
    temp3.context="this is context 3"

    temp1.questions=["1 1","1 2","1 3"]
    temp2.questions=["2 1","2 2","2 3"]
    temp3.questions=["3 1","3 2","3 3"]

    this.allContextQuestion=[temp1,temp2,temp3]
    /*const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    this.http.get<ContextQuestion[]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allContextQuestion = response;
      }
    );*/
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

    let answer1 = ["a 1 1","a 1 2","a 1 3"]
    let answer2 = ["a 2 1","a 2 2","a 2 3"]
    let answer3 = ["a 3 1","a 3 2","a 3 3"]

    this.allCorrectAnswers=[answer1,answer2,answer3]
    /*const headers = new HttpHeaders().append("Authorization",this._localStorageService.loadInfo());
    this.http.get<string[][]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allCorrectAnswers = response;
      }
    );*/
  }

  public hasNext() : boolean {
    return this._localStorageService.getIndexOfContextQuestion()<this.allContextQuestion.length-1;
  }
}

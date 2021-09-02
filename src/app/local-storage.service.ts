import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRefService } from './local-storage-ref.service';
import { ContextQuestion } from './models/context-question';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _localStorage: Storage;
  private baseurl = "https://localhost:5001/api/";

  private _myData$ = new BehaviorSubject<string>("");
  public myData$ = this._myData$.asObservable()

  private _myIndex$ = new BehaviorSubject<number>(0);
  public myIndex$ = this._myIndex$.asObservable()

  private allContextQuestion : ContextQuestion [] = []
  private allCorrectAnswers : string [] [] = []
  
  private _myCQs$ = new BehaviorSubject<ContextQuestion[]>([])
  public myCQs$ = this._myCQs$.asObservable()

  private _myCAs$ = new BehaviorSubject<string[][]>([])
  public myCAs$ = this._myCAs$.asObservable()

  constructor(private _localStorageRefService: LocalStorageRefService,
              private http : HttpClient) {
      this._localStorage = _localStorageRefService.localStorage
      this.loadAllContextQuestion();
      this.loadAllCorrectAnswers();
      this.setIndexOfContextQuestion(0);
  }

  setInfo(token : string) {
    const jsonData = JSON.stringify(token)
    this._localStorage.setItem('token', jsonData)
    this._myData$.next(token)
  }

  loadInfo() : string{
    const data = JSON.parse(this._localStorage.getItem('token') || "");
    this._myData$.next(data)
    return data;
  }

  setIndexOfContextQuestion(index : number) : void {
    const jsonData = JSON.stringify(index)
    this._localStorage.setItem('index', jsonData);
    this._myIndex$.next(index)
  }

  getIndexOfContextQuestion() : number {
    const data = JSON.parse(this._localStorage.getItem('index') || "")
    this._myIndex$.next(data)
    return data;
  }

  loadAllContextQuestion() : void {
    /*const temp1=new ContextQuestion();
    const temp2=new ContextQuestion();
    const temp3=new ContextQuestion();

    temp1.context="this is context 1"
    temp2.context="this is context 2"
    temp3.context="this is context 3"

    temp1.questions=["1 1","1 2","1 3"]
    temp2.questions=["2 1","2 2","2 3"]
    temp3.questions=["3 1","3 2","3 3"]

    this.allContextQuestion=[temp1,temp2,temp3]*/
    const headers = new HttpHeaders().append("Authorization",this.loadInfo());
    this.http.get<ContextQuestion[]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allContextQuestion = response;
      }
    );
  }

  getCurrentContextQuestion() : ContextQuestion {
    return this.allContextQuestion[this.getIndexOfContextQuestion()]
  }

  getCurrentCorrectAnswer() : string []{
    return this.allCorrectAnswers[this.getIndexOfContextQuestion()];
  }

  loadAllCorrectAnswers() : void {
    /*let answer1 = ["a 1 1","a 1 2","a 1 3"]
    let answer2 = ["a 2 1","a 2 2","a 2 3"]
    let answer3 = ["a 3 1","a 3 2","a 3 3"]

    this.allCorrectAnswers=[answer1,answer2,answer3]*/
    const headers = new HttpHeaders().append("Authorization",this.loadInfo());
    this.http.get<string[][]>(this.baseurl+"getContextQuestion", {headers}).subscribe(
      response =>{
        this.allCorrectAnswers = response;
      }
    );
  }

  public hasNext() : boolean {
    return this.getIndexOfContextQuestion()<this.allContextQuestion.length-1;
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseurl = "https://localhost:5001/api/";

  constructor(private http : HttpClient) { }

  public registerUser (user :User) : Observable<boolean> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', 'POST')
    .append('Access-Control-Allow-Origin', '*');

    return this.http.post<boolean>(this.baseurl + "register",user,{headers});
  }

}

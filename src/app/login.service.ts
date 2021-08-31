import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseurl = "https://localhost:5001/api/";

  private isLoggedIn : boolean = false;
  private currentUser : User = new User();

  constructor(private http : HttpClient) {
    this.isLoggedIn = false;
  }

  isUserLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  public login(user : User) : Observable<boolean> {

    this.currentUser = user;
    this.isLoggedIn = true;
    return of(true);

    this.http.post<boolean>(this.baseurl + "login", user).subscribe(
      response =>{
        this.isLoggedIn = response;
        if(this.isLoggedIn)
          this.currentUser = user;
      }
    )

    return this.http.post<boolean>(this.baseurl+"login",user);
  }

  public isAdminUser() : boolean {
    return this.currentUser.role.toUpperCase() == "ADMIN";
  }

  public isStudentUser() : boolean {
    return this.currentUser.role.toUpperCase() == "STUDENT";
  }

  public getCurrentUser() : User {
    return this.currentUser;
  }

  public logoutUser() : void {
    this.isLoggedIn = false;
  }
}

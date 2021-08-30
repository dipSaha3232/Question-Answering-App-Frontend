import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseurl = "https://localhost:5001/api/";

  private isLoggedIn : boolean = false;
  private curentUser : User = new User();

  constructor(private http : HttpClient) {
    this.isLoggedIn = false;
  }

  isUserLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  public login(user : User) : Observable<boolean> {
    this.http.post<boolean>(this.baseurl + "login", user).subscribe(response =>{
      this.isLoggedIn = response;
      if(this.isLoggedIn) {
        /*this.searchUser(user.username).subscribe(
          response1 => {
            this.cuurentUser = response1;
          }
        )*/
        this.curentUser = user;
      }
    })

    return this.http.post<boolean>(this.baseurl+"login",user);
  }

  public isAdminUser() : boolean {
    return this.curentUser.role.toUpperCase() == "ADMIN";
  }

  public isStudentUser() : boolean {
    return this.curentUser.role.toUpperCase() == "STUDENT";
  }

  public getCurrentUser() : User {
    return this.curentUser;
  }

  public logoutUser() : void {
    this.isLoggedIn = false;
  }

  public searchUser(username :  string) : Observable<User> {
    const params = new HttpParams().set("username", username);
    return this.http.get<User>(this.baseurl+"search",{params});
  } 
}

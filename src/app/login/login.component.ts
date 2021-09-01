import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();

  public error : boolean = false;
  retUrl : any = "login";

  constructor(private loginService : LoginService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params =>{
      this.retUrl = params.get('retUrl');
    });
  }

  login() : void {

    if(this.user.username == "" || this.user.password == "" || this.user.role == "")
    {
      alert("Please fill up all fields before submit");
      return ;
    }
    
    this.loginService.login(this.user).subscribe(
      response =>{
        if(response != ""){
          alert("Login Successful");
          if(this.loginService.isStudentUser())
            this.router.navigate(['student-panel']);
          if(this.loginService.isAdminUser())
            this.router.navigate(['admin-panel']);
        }
        else {
          alert("Username or Password does not match");
          this.router.navigate(["login"])
        }
        this.user = new User();
      }
    )
  }

}

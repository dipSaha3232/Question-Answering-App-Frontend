import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  user : User = new User();

  retype_password : string = "";
  retUrl : any = "login";

  constructor(private registerService : RegisterService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.retUrl = params.get('retUrl');
    });
  }

  usernameValidation(username : string) : boolean {
    return ! (username.indexOf(' ')>=0);
  }

  passwordValidation(password : string) : boolean {
    return password.length>=8;
  }

  addUser() : void {

    if(this.user.username == "" || this.user.password == "" || this.user.role == "" || this.user.email == "")
    {
      alert("Please fill up all fields before submit");
      return ;
    }

    if(! this.usernameValidation(this.user.username))
    {
      alert("Username must be a word");
      return ;
    }

    if(! this.passwordValidation(this.user.password)){
      alert("Password must contain at least 8 characters")
      return ;
    }

    if(this.user.password != this.retype_password)
    {
      alert("Password and Retype Password does not match");
      return ;
    }
    
    this.registerService.registerUser(this.user).subscribe (
      response =>{
        if(response == true)
        {
          alert("Account Created Successfully");
          this.router.navigate(["login"])
        }
        else 
          alert("Username ALready Exists");
        
          this.user = new User();
      }
    );
  }

}

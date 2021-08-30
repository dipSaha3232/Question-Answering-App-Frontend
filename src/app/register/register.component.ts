import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  user : User = new User();
  user1 : User = new User();

  retype_password : string = "";

  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {
  }

  addUser() : void {

    if(this.user.password != this.retype_password)
    {
      alert("Password and Retype Password does not match");
      return ;
    }
    
    this.registerService.registerUser(this.user).subscribe (
      response =>{
        if(response == true)
          alert("Account Created Successfully");
        else 
          alert("Username ALready Exists");
        
          this.user = new User();
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuardService implements CanActivate{

  constructor(private router : Router,
              private loginService : LoginService) { }

  canActivate(route : ActivatedRouteSnapshot, snap : RouterStateSnapshot) {

    if(! this.loginService.isStudentUser()) {
      this.router.navigate(["login"], {queryParams : {retUrl : route.url}});
      return false;
    }

    return true;
  }
}

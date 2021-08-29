import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router,
              private loginService : LoginService) { }
  
  canActivate(route : ActivatedRouteSnapshot, snap : RouterStateSnapshot) {
    
    if(! this.loginService.isUserLoggedIn()) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}

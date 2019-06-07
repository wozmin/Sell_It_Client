import { CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router:Router){}

  canActivate():boolean{
    let token = localStorage.getItem('accessToken');
    if(!token) {
      this.router.navigateByUrl('sign-in');
      return false;
    }
    return true;
  }
}

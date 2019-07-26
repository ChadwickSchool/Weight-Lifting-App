import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable ()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const result = this.authService.getUserID() !== null && this.authService.getUserID() !== undefined;
      console.log("Login Guard is " + result);
      console.log('User id is ' + this.authService.getUserID());
      return result;
  }

}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getAuthenticatedUser();
    const loggedIn = !!user;

    if (!loggedIn) {

    }

    return loggedIn;
  }

  async canActivateChild(): Promise<boolean> {
    const user = await this.authService.getAuthenticatedUser();
    const loggedIn = !!user;

    if (!loggedIn) {
      this.router.navigate(['']);
    }

    return loggedIn;
  }
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const firebaseUser = await this.authService.getAuthenticatedUser();
    const loggedIn = !!firebaseUser;
    const id = await firebaseUser.getIdToken();

    if (!loggedIn) {
      this.router.navigate(['']);
    }
    return loggedIn;
  }
}

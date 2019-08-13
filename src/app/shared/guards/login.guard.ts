import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getAuthenticatedUser();
    const loggedIn = !!user;

    if (!loggedIn) {
      this.router.navigate(['']);
    }

    return loggedIn;
  }
}

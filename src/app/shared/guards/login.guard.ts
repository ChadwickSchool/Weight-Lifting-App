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
    const user = await this.authService.getUser();
    const loggedIn = !!user;

    if (!loggedIn) {
      console.log('access denied');
      this.router.navigate(['']);
    }

    return loggedIn;
  }
}

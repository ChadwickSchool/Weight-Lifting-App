import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const firebaseUser = await this.authService.getAuthenticatedUser();
    const id = await firebaseUser.getIdToken();
    // const isAdmin = await this.userService.isAdmin(id);
    // console.log('isAdmin:' + isAdmin);
    // if (isAdmin) {
    //       console.log('Admin');
    //       return true;
    //     } else {
    //       console.log('Student');
    //       return false;
    //     }
    return true;
  }
}

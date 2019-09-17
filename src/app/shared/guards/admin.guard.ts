import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

  async canActivate(): Promise<boolean> {
    const id = this.auth.userID;
    console.log('Checking admin guard');
    const isAdmin = await this.userService.isAdmin(id);
    console.log(isAdmin);
    return this.userService.isAdmin(id);
  }
}

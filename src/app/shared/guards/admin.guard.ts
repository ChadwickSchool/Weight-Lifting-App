// import { Component, OnInit, Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from '../models/user.model';

// @Injectable()
// export class AdminGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   async canActivate(): Promise<boolean> {
//     const user = await this.authService.getUser() as User;
//     const loggedIn = user.isAdmin;

//     if (loggedIn) {
//       this.router.navigate(['']);
//     }

//     return loggedIn;
//   }
// }

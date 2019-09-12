import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'wla-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(public userService: UserService, public auth: AuthService, public router: Router) {}

  ngOnInit() {}

  async googleSignIn() {
    await this.auth.googleSignin();
    const id = this.auth.userID;
    // console.log(this.userService.isAdmin(id));
    // console.log('id: ' + id);
    if (this.userService.isAdmin(id)) {
    this.router.navigate(['/admin-home']);
    } else {
      this.router.navigate(['/student-home']);
    }
  }
}

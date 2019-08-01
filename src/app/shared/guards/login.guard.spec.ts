import { TestBed, fakeAsync, ComponentFixture, flush } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'src/app/app.component';

import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginGuard } from './login.guard';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import TestUtils from '../utils/test-utils';
import { AdminHomeComponent } from 'src/app/admin-home/admin-home.component';
import { StudentHomeComponent } from 'src/app/student-home/student-home.component';
import { MaterialModule } from '../material.module';
import { Location } from '@angular/common';
import { getDefaultService } from 'selenium-webdriver/chrome';

describe('Login Guard Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let userAuthService: AuthService;
  let location: Location;

  const authServiceStub = {
    user$: of(null),
    userID: null,

    async googleSignin() {
      this.userID = '1';
      this.user$ = of(TestUtils.getTestUser());
    },

    async signOut() {
      this.user$ = of(null);
    },

    getUserID(): string {
      return this.userID;
    },

    getUser(): Promise<any> {
      return this.user$.toPromise();
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LoginComponent,
          },
          {
            path: 'admin-home',
            component: AdminHomeComponent,
            canActivate: [LoginGuard]
          },
          {
            path: 'student-home',
            component: StudentHomeComponent,
            canActivate: [LoginGuard]
          }
        ]),
        MaterialModule
      ],
      providers: [
        LoginGuard,
        {
          provide: AuthService,
          useValue: authServiceStub
        }
        ],
      declarations: [LoginComponent, AdminHomeComponent, StudentHomeComponent]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    userAuthService = TestBed.get(AuthService);
  });
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router.initialNavigation();
  }));

  describe('tries to route to a page without authentication', () => {
    it('should show login page when trying to navigate to admin-home when not logged in', fakeAsync(() => {
      router.navigate(['admin-home']);
      flush();
      expect(location.path()).toEqual('/');
    }));

    it('should show login page when trying to navigate to student-home when not logged in', fakeAsync(() => {
      router.navigate(['student-home']);
      flush();
      expect(location.path()).toEqual('/');
    }));
  });

  describe('tries to route to a page with authentication', () => {
    it('should show admin-home when trying to navigate to admin-home when logged in', fakeAsync(() => {
      userAuthService.googleSignin();
      router.navigate(['admin-home']);
      flush();
      expect(location.path()).toEqual('/admin-home');
    }));

    it('should show student-home when trying to navigate to student-home when logged in', fakeAsync(() => {
      userAuthService.googleSignin();
      router.navigate(['student-home']);
      flush();
      expect(location.path()).toEqual('/student-home');
    }));
  });

});

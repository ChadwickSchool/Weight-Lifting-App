import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../../shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import TestUtils from '../../shared/models/test-utils';
import { useAnimation } from '@angular/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map, tap } from 'rxjs/operators';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<any>;

  const authServiceStub = {
    user$: of(null),

    async googleSignin() {
      this.user$ = of(TestUtils.getTestUser());
    },

    async signOut() {
      this.user$ = of(null);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login when logged out', () => {
    component.auth.signOut();
    const element = TestUtils.getElement(fixture);
    expect(element.innerText).not.toContain('Logout');
    expect(element.innerText).toContain('Login');
  });

  it('should display log out when logged in', () => {
    component.auth.googleSignin();
    fixture.detectChanges();
    const element = TestUtils.getElement(fixture);
    expect(element.innerText).not.toContain('Login');
    expect(element.innerText).toContain('Logout');
  });

  it('should display Today\'s Workout when student is logged in', () => {
    component.auth.googleSignin();
    fixture.detectChanges();
    const element = TestUtils.getElement(fixture);
    expect(element.innerText).toContain('Today\'s Workout');
  });

  it('should display create workout when teacher is logged in', () => {
    const user = TestUtils.getTestUser();
    user.isAdmin = true;
    component.auth.user$ = of(user);
    console.log('Set admin to true');
    fixture.detectChanges();
    const element = TestUtils.getElement(fixture);
    expect(element.innerText).toContain('Create Workout');
  });
});

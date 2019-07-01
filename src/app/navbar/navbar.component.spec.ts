import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '../shared/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import TestUtils from '../shared/models/test-utils';
import { useAnimation } from '@angular/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;


  const authServiceStub = {
    user$: of(null),

    async googleSignin() {
      this.user$ = of(TestUtils.getTestUser());
    },

    async googleSignInWithAdmin() {
      const user = TestUtils.getTestUser();
      user.isAdmin = true;
      return of(user);
    },
    async signOut() {
      this.user$ = of(null);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

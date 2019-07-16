import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../shared/material.module';
import { SideNavComponent } from './side-nav.component';
import { AuthService } from 'src/app/services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { of } from 'rxjs';
import TestUtils from 'src/app/shared/utils/test-utils';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

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
      declarations: [ SideNavComponent ],
      imports : [ MaterialModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
       ],
      providers : [
        {
          provide : AuthService,
          useValue: authServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

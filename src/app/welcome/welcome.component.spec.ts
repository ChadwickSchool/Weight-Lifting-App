import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { Observable, of } from 'rxjs';
import TestUtils from '../shared/utils/test-utils';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GroupService } from '../services/groups.service';
import { DebugElement } from '@angular/core';
import { TodayWorkoutComponent } from '../workout/today.workout.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { SelectMenuTestHelper } from '../shared/utils/select-menu-helper';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const groupServiceStub = {
    getAddedGroups(): Observable<any> {
      return of([TestUtils.getTestGroup(
        'basketball',
        undefined
      ), TestUtils.getTestGroup(
        'waterpolo',
        undefined
      )]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule, AppRoutingModule],
      declarations: [WelcomeComponent, TodayWorkoutComponent, AdminComponent, AdminHomeComponent],
      providers: [
        {
          provide: GroupService,
          useValue: groupServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
    selectMenu = new SelectMenuTestHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display home', () => {
    const d = componentElement.querySelector('h1');
    expect(d.textContent).toContain('Home');
  });

  it('should display the dropdown', () => {
    const d = componentElement.querySelector('mat-form-field');
    expect(d.textContent).toContain('Select Your Group');
  });

  it('should display groups correctly in the dropdown', () => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    const basketballElement = selectMenu.getOptionByKey(options, 'basketball');
    const waterpoloElement = selectMenu.getOptionByKey(options, 'waterpolo');
    expect(basketballElement).not.toBeNull();
    expect(waterpoloElement).not.toBeNull();
  });
});

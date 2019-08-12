import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeComponent } from './student-home.component';
import { Observable, of } from 'rxjs';
import TestUtils from '../shared/utils/test-utils';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GroupService } from '../services/groups.service';
import { DebugElement } from '@angular/core';
import { TodayWorkoutComponent } from '../workout/today.workout.component';
import { CreateWorkoutComponent } from '../create-workout/create-workout.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { SelectMenuTestHelper } from '../shared/utils/select-menu-helper';
import { LoginComponent } from '../login/login.component';
import { StudentEntireWorkoutComponent } from '../student-entire-workout/student-entire-workout.component';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { StudentListComponent } from '../student-list/student-list.component';
import { StudentWorkoutHistoryComponent } from '../student-workout-history/student-workout-history.component';

describe('StudentHomeComponent', () => {
  let component: StudentHomeComponent;
  let fixture: ComponentFixture<StudentHomeComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const groupServiceStub = {
    getAddedGroups(): Observable<any> {
      return of([
        TestUtils.getTestGroup('basketball', undefined),
        TestUtils.getTestGroup('waterpolo', undefined)
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
        AppRoutingModule
      ],
      declarations: [
        StudentHomeComponent,
        TodayWorkoutComponent,
        CreateWorkoutComponent,
        AdminHomeComponent,
        LoginComponent,
        StudentEntireWorkoutComponent,
        StudentListComponent,
        StudentWorkoutHistoryComponent
      ],
      providers: [
        {
          provide: GroupService,
          useValue: groupServiceStub
        },
        {
          provide: CurrentGroupSelectedService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHomeComponent);
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

  it('should disable the button when not selecting an option', () => {
    expect(componentElement.querySelector('button').disabled).toBeTruthy();
  });

  it('should enable the button when selecting an option', () => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.getOptionByKey(options, 'basketball').click();
    fixture.detectChanges();
    expect(componentElement.querySelector('button').disabled).toBeFalsy();
  });
});

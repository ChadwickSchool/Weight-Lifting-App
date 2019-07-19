import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { CreateWorkoutComponent } from './create-workout.component';
import { element, by } from 'protractor';
import { MaterialModule } from '../shared/material.module';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { Router } from '@angular/router';
import TestUtils from '../shared/utils/test-utils';
import { of, Observable } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { Group } from '../shared/models/group.model';
import { CurrentDateSelectedService } from '../services/current-date-selected.service';

describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  const recommendedExerciseStub = {
    getAddedExercises(): Observable<any> {
      return of([
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ]);
    }
  };

  const currentGroupSelectedServiceStub = {
    getCurrentGroup(): Observable<Group> {
      return of(TestUtils.getTestGroup());
    },

    setCurrentGroup(group: Group) {
      component.group = group;
    }
  };

  const currentDateSelectedServiceStub = {
    get getCurrentDate(): Date {
      return TestUtils.getTestDate();
    },

    setCurrentDate(date: Date) {
      component.date = date;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CreateWorkoutComponent],
      providers: [
        {
          provide: RecommendedExerciseService,
          useValue: recommendedExerciseStub
        },
        {
          provide: Router
        },
        {
          provide: CurrentGroupSelectedService,
          useValue: currentGroupSelectedServiceStub
        },
        {
          provide: CurrentDateSelectedService,
          useValue: currentDateSelectedServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selected group', () => {
    currentGroupSelectedServiceStub.setCurrentGroup(TestUtils.getTestGroup());
    const headerElement = componentElement.querySelector('h1');
    fixture.detectChanges();
    expect(headerElement.textContent).toContain('Test Group');
  });

  it('should display selected date', () => {
    currentDateSelectedServiceStub.setCurrentDate(TestUtils.getTestDate());
    const headerElement = componentElement.querySelector('h2');
    fixture.detectChanges();
    expect(headerElement.textContent).toContain('May 17, 1937');
  });
});

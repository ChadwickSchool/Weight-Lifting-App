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
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../shared/models/workout.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { ɵNAMESPACE_URIS } from '@angular/platform-browser';

describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let workoutService: WorkoutService;

  const recommendedExerciseStub = {
    getAddedExercises(): Observable<Array<RecommendedExercise>> {
      return of([
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ]);
    }
  };

  const currentGroupSelectedServiceStub = {
    getCurrentGroup(): Group {
      return TestUtils.getTestGroup();
    },

    setCurrentGroup(group: Group) {
      component.group = group;
    }
  };

  const currentDateSelectedServiceStub = {
    getCurrentDate(): Date {
      return TestUtils.getTestDate();
    },

    setCurrentDate(date: Date) {
      component.date = date;
    }
  };

  const workoutServiceStub = {
    workouts: [],

    saveWorkout(workout: Workout): void {
      this.workouts.push(workout);
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
        },
        {
          provide: WorkoutService,
          useValue: workoutServiceStub
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
    workoutService = TestBed.get(WorkoutService);
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
    expect(headerElement.textContent).toContain('Apr 17, 1937');
  });

  it('should call saved workout with the correct workout', () => {
    // To Do
    // figure out how to get properly use reduce to get exercise names out of array
    const reducer = (accumulator, currentValue) =>
      accumulator.push(currentValue.name);
    element(by.id('workout-button')).click();
    const exerciseNames = workoutService.workouts.reduce(reducer);
    expect(exerciseNames).toEqual(['squat', 'bench press', 'deadlift']);
    expect(false).toBe(true);
  });
});

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
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { Group } from '../shared/models/group.model';
import { CurrentDateSelectedService } from '../services/current-date-selected.service';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../shared/models/workout.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { ɵNAMESPACE_URIS, By } from '@angular/platform-browser';
import Utils from '../shared/utils/utils';
import WorkoutClass from '../shared/models/workout';
import { RecommendedExercisesDialogComponent } from '../recommended-exercises-dialog/recommended-exercises-dialog.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import GroupClass from '../shared/models/group';

describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let workoutService: WorkoutService;
  let recommendedExerciseService: RecommendedExerciseService;
  let workoutServiceSpy: jasmine.Spy;

  const recommendedExerciseStub = {
    recommendedExercises$: new BehaviorSubject<Array<RecommendedExercise>>(
      null
    ),
    addedRecExercises: Array<RecommendedExercise>(),
    getAddedExercises(): Observable<Array<RecommendedExercise>> {
      return of([
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ]);
    },

    addExercise(recommendedExercise: any): void {
      this.addedRecExercises.push(recommendedExercise);
      this.recommendedExercises$.next(this.addedRecExercises);
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

    saveWorkout(
      recExercise: Array<RecommendedExercise>,
      dueDate: Date,
      group: Group
    ): void {
      const newWorkout = new WorkoutClass(
        '1',
        recExercise,
        dueDate,
        Utils.getSimplifiedDate(new Date('2019-07-19')),
        group
      );
      this.workouts.push(newWorkout);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
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
    workoutServiceSpy = spyOn(TestBed.get(WorkoutService), 'saveWorkout');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
    workoutService = TestBed.get(WorkoutService);
    recommendedExerciseService = TestBed.get(RecommendedExerciseService);
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

  it('should call save workout with all correct values', () => {
    component.group = new GroupClass('fortnite', '1');
    component.date = new Date('2019-08-01');
    recommendedExerciseService.addExerciseLocal(
      TestUtils.getTestRecommendedExercise('1', 'squat')
    );
    recommendedExerciseService.addExerciseLocal(
      TestUtils.getTestRecommendedExercise('2', 'benchpress')
    );
    recommendedExerciseService.addExerciseLocal(
      TestUtils.getTestRecommendedExercise('3', 'pullups')
    );
    component.saveWorkout();
    expect(workoutServiceSpy).toHaveBeenCalledWith(
      [
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ],
      new Date('2019-08-01'),
      new GroupClass('fortnite', '1')
    );
  });
});

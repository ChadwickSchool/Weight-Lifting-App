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
import { of, Observable, Subject } from 'rxjs';
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

fdescribe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let dialogFixture: ComponentFixture<RecommendedExercisesDialogComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let dialogComponent: RecommendedExercisesDialogComponent;
  let dialogComponentDebug: DebugElement;
  let dialogComponentElement: HTMLElement;
  let workoutService: WorkoutService;
  let workoutServiceSpy: jasmine.Spy;

  const recommendedExerciseStub = {
    recommendedExercises$: new Subject<RecommendedExercise>(),
    getAddedExercises(): Observable<Array<RecommendedExercise>> {
      return of([
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ]);
    },

    addExercise(recommendedExercise: any): void {
      this.recommendedExercises$.next(recommendedExercise);
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
      name: string,
      recExercise: Array<RecommendedExercise>,
      dueDate: Date,
      group: Group
    ): void {
      const newWorkout = new WorkoutClass(
        '1',
        name,
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
      declarations: [
        CreateWorkoutComponent
      ],
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
        },
        // {
        //   provide: MatDialogRef
        // },
        // {
        //   provide: MAT_DIALOG_DATA
        // }
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

  // it('should call saved workout with the correct values', () => {
  //   dialogFixture = TestBed.createComponent(
  //     RecommendedExercisesDialogComponent
  //   );
  //   dialogComponent = dialogFixture.componentInstance;
  //   dialogComponentDebug = dialogFixture.debugElement;
  //   dialogComponentElement = dialogComponentDebug.nativeElement;
  //   dialogFixture.detectChanges();
  //   const recExercise = [
  //     TestUtils.getTestRecommendedExercise(),
  //     TestUtils.getTestRecommendedExercise('2', 'Arnold Shoulder Press')
  //   ];
  //   const exerciseName = dialogComponentDebug.query(By.css('#name-input'))
  //     .nativeElement;
  //   const sets = dialogComponentDebug.query(By.css('#sets-input'))
  //     .nativeElement;
  //   const reps = dialogComponentDebug.query(By.css('#reps-input'))
  //     .nativeElement;
  //   const weightRange = dialogComponentDebug.query(By.css('#weight-input'))
  //     .nativeElement;
  //   const saveButton = dialogComponentElement.querySelector<HTMLButtonElement>(
  //     '#submit-button'
  //   );
  //   const saveWorkout = dialogComponentElement.querySelector<HTMLButtonElement>(
  //     '#workout-button'
  //   );
  //   componentElement.querySelector<HTMLButtonElement>('#add-button').click();
  //   dialogFixture.detectChanges();
  //   exerciseName.value = 'Ooga Booga';
  //   exerciseName.dispatchEvent(new Event('input'));
  //   sets.value = '5';
  //   sets.dispatchEvent(new Event('input'));
  //   reps.value = '20';
  //   reps.dispatchEvent(new Event('input'));
  //   weightRange.value = '50-60';
  //   weightRange.dispatchEvent(new Event('input'));
  //   saveButton.click();
  //   fixture.detectChanges();
  //   saveWorkout.click();
  //   fixture.detectChanges();
  //   expect(workoutServiceSpy).toHaveBeenCalledWith(
  //     'Basketball Workout',
  //     recExercise,
  //     Utils.getSimplifiedDate(new Date('2019-07-20')),
  //     TestUtils.getTestGroup()
  //   );
  // });
});

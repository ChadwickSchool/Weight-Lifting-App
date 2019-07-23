import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { TodayWorkoutComponent } from './today.workout.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { of, Observable } from 'rxjs';
import { ExerciseService } from '../services/exercise.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import TestUtils from '../shared/utils/test-utils';
import { SelectMenuTestHelper } from '../shared/utils/select-menu-helper';
import { DebugElement } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';

describe('TodayWorkoutComponent', () => {
  let component: TodayWorkoutComponent;
  let fixture: ComponentFixture<any>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const recExercisesStub = {
    getAddedExercises(): Observable<any> {
      return of([
        TestUtils.getTestRecommendedExercise(
          undefined,
          'squats',
          undefined,
          undefined,
          undefined,
          undefined
        ),
        TestUtils.getTestRecommendedExercise(
          undefined,
          'bench press',
          undefined,
          undefined,
          undefined,
          undefined
        ),
        TestUtils.getTestRecommendedExercise(
          undefined,
          'deadlift',
          undefined,
          undefined,
          undefined,
          undefined
        )
      ]);
    }
  };

  const exercisesStub = {
     exercises: [TestUtils.getTestExercise(
      undefined,
      'squats',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ), TestUtils.getTestExercise(
      undefined,
      'bench press',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    )],

    getAddedExercises(): Observable<any> {
      return of(this.exercises);
    },

    addExercise(exercise: Exercise, setNumber: number) {
      const newEntry = TestUtils.getTestExercise(
        undefined,
        exercise.name,
        setNumber,
        exercise.reps,
        exercise.weight,
        undefined,
        undefined,
        exercise.userComment
      );
      console.log('Adding an exercise');
      this.exercises.push(newEntry);
      console.log('This.exercises');
      console.log(this.exercises);
      component.exerciseDataSource = this.exercises;
      console.log('Component.exercise');
      console.log(component.exerciseDataSource);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      declarations: [TodayWorkoutComponent],
      providers: [
        {
          provide: RecommendedExerciseService,
          useValue: recExercisesStub
        },
        {
          provide: ExerciseService,
          useValue: exercisesStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWorkoutComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
    selectMenu = new SelectMenuTestHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dropdown', () => {
    const dropdownElement = componentElement.querySelector('mat-form-field');
    expect(dropdownElement.textContent).toContain('Select Your Current Exercise');
  });

  it('should display exercises correctly in the dropdown', () => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    const squatsElement = selectMenu.getOptionByKey(options, 'squats');
    const benchPressElement = selectMenu.getOptionByKey(options, 'bench press');
    const deadliftElement = selectMenu.getOptionByKey(options, 'deadlift');
    expect(squatsElement).not.toBeNull();
    expect(benchPressElement).not.toBeNull();
    expect(deadliftElement).not.toBeNull();
  });

  it('should have exercises in the Your Workout table', () => {
    const studentExerciseTable = componentElement.querySelector('#student-exercise-table');
    expect(studentExerciseTable.textContent).toContain('squats');
    expect(studentExerciseTable.textContent).toContain('bench press');
  });

  it('should say your current exercise on the expansion panel', fakeAsync(() => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'squats');
    const panelTitleElements = componentElement.querySelectorAll('mat-panel-title');
    expect(panelTitleElements.length).toBe(2);
    expect(panelTitleElements[1].innerHTML).toContain('squats');
  }));

  it('should disable panel before exercise is selected', () => {
    const panelElements = componentElement.querySelectorAll<HTMLElement>('mat-expansion-panel');
    expect(panelElements.length).toBe(2);
    expect(panelElements[1].attributes.getNamedItem('ng-reflect-disabled').value).toEqual('true');
  });

  it('should enable panel when exercise is selected', fakeAsync(() => {
    const panelElements = componentElement.querySelectorAll<HTMLElement>('mat-expansion-panel');
    expect(panelElements.length).toBe(2);
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'squats');
    expect(panelElements[1].attributes.getNamedItem('ng-reflect-disabled').value).toEqual('false');
  }));

  fit('should be able to add student exercise to table', fakeAsync(() => {
    const reps = componentElement.querySelector<HTMLInputElement>('#reps-input');
    const weight = componentElement.querySelector<HTMLInputElement>('#weight-input');
    const comments = componentElement.querySelector<HTMLInputElement>('#comments-input');
    const studentExerciseTable = componentElement.querySelector('#student-exercise-table');
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'deadlift');
    reps.click();
    reps.value = '20';
    reps.dispatchEvent(new Event('input'));
    weight.click();
    weight.value = '50';
    weight.dispatchEvent(new Event('input'));
    comments.click();
    comments.value = 'asdfghjkl';
    comments.dispatchEvent(new Event('textarea'));
    componentElement.querySelector<HTMLButtonElement>('#next-btn').click();
    fixture.detectChanges();
    expect(studentExerciseTable.textContent).toContain('deadlift');

  }));
});

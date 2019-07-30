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
import { By } from '@angular/platform-browser';
import ExerciseClass from '../shared/models/exercise';

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
          'Squats',
          undefined,
          undefined,
          undefined,
          undefined
        ),
        TestUtils.getTestRecommendedExercise(
          undefined,
          'Bench Press',
          undefined,
          undefined,
          undefined,
          undefined
        ),
        TestUtils.getTestRecommendedExercise(
          undefined,
          'Deadlift',
          undefined,
          undefined,
          undefined,
          undefined
        )
      ]);
    }
  };

  const exercisesStub = {
    exercises: [
      TestUtils.getTestExercise(
        '99',
        'Squats',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ),
      TestUtils.getTestExercise(
        undefined,
        'Bench Press',
        undefined,
        undefined,
        undefined,
        undefined,
        new Date('2019-06-26'),
        undefined
      ),
      TestUtils.getTestExercise(
        undefined,
        'Bench Press',
        undefined,
        undefined,
        undefined,
        undefined,
        new Date('2019-07-26'),
        undefined
      )
    ],

    // getAddedExercises(): Observable<any> {
    //   return of(this.exercises);
    // },

    getExercises(name: string): Observable<Exercise[]> {
      const query = this.exercises.filter(exercise => exercise.name === name).filter(
        exercise => exercise.date.getMonth() === new Date('2019-07-26').getMonth());
      console.log('Name: ' + name);
      console.log('All exercises');
      console.log(this.exercises);
      console.log('Filtered Exercises');
      console.log(query);
      return of(query);
    },

    addExercise(exercise: Exercise, setNumber: number) {
      const newEntry = TestUtils.getTestExercise(
        undefined,
        exercise.name,
        setNumber,
        exercise.reps,
        exercise.weight,
        undefined,
        new Date('2019-06-14'),
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
    expect(dropdownElement.textContent).toContain(
      'Select Your Current Exercise'
    );
  });

  it('should display exercises correctly in the dropdown', () => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    const squatsElement = selectMenu.getOptionByKey(options, 'Squats');
    const benchPressElement = selectMenu.getOptionByKey(options, 'Bench Press');
    const deadliftElement = selectMenu.getOptionByKey(options, 'Deadlift');
    expect(squatsElement).not.toBeNull();
    expect(benchPressElement).not.toBeNull();
    expect(deadliftElement).not.toBeNull();
  });

  it('should not have exercises in the Your Workout table at the start', () => {
    const studentExerciseTable = componentElement.querySelector(
      '#student-exercise-table'
    );
    expect(studentExerciseTable.textContent).not.toContain('Squats');
    expect(studentExerciseTable.textContent).not.toContain('Bench Press');
  });

  it('should say your current exercise on the expansion panel', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    const panelTitleElements = componentElement.querySelectorAll(
      'mat-panel-title'
    );
    fixture.detectChanges();
    expect(panelTitleElements.length).toBe(2);
    expect(panelTitleElements[1].innerHTML).toContain('Squats');
  });

  it('should disable panel before exercise is selected', () => {
    const panelElements = componentElement.querySelectorAll<HTMLElement>(
      'mat-expansion-panel'
    );
    expect(panelElements.length).toBe(2);
    expect(
      panelElements[1].attributes.getNamedItem('ng-reflect-disabled').value
    ).toEqual('true');
  });

  it('should enable panel when exercise is selected', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const panelElements = componentElement.querySelectorAll<HTMLElement>(
      'mat-expansion-panel'
    );
    expect(panelElements.length).toBe(2);
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();
    expect(
      panelElements[1].attributes.getNamedItem('ng-reflect-disabled').value
    ).toEqual('false');
  });

<<<<<<< HEAD
  it('should be able to add student exercise to table', async () => {
=======
  it('should disable next set button before all fields are filled out', () => {
    const buttonElement = componentElement.querySelector<HTMLElement>('#next-btn');
    expect(buttonElement.attributes.getNamedItem('ng-reflect-disabled').value).toEqual('true');
  });

  it('should enable next set button when all fields are filled out', async () => {
>>>>>>> view-rec-workorkout
    await fixture.whenStable();
    fixture.detectChanges();
    const repsInput = componentDebug.query(By.css('#reps-input')).nativeElement;
    const weightInput = componentDebug.query(By.css('#weight-input'))
      .nativeElement;
    const buttonElement = componentElement.querySelector<HTMLElement>('#next-btn');
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();
    expect(buttonElement.attributes.getNamedItem('ng-reflect-disabled').value).toEqual('true');
    repsInput.value = '20';
    repsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonElement.attributes.getNamedItem('ng-reflect-disabled').value).toEqual('true');
    weightInput.value = '50';
    weightInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(buttonElement.attributes.getNamedItem('ng-reflect-disabled').value).toEqual('false');
  });


  it('should be able to add student exercise to table', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const repsInput = componentDebug.query(By.css('#reps-input')).nativeElement;
    const weightInput = componentDebug.query(By.css('#weight-input'))
      .nativeElement;
    const commentsInput = componentDebug.query(By.css('#comment-input'))
      .nativeElement;
    const studentExerciseTable = componentElement.querySelector(
      '#student-exercise-table'
    );
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Deadlift', false);
    repsInput.value = '20';
    repsInput.dispatchEvent(new Event('input'));
    weightInput.value = '50';
    weightInput.dispatchEvent(new Event('input'));
    commentsInput.value = 'ooga booga';
    commentsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    componentElement.querySelector<HTMLButtonElement>('#next-btn').click();
    const date = new Date('2019-06-14');
    // create the deadlift exercise
    const deadlift = new ExerciseClass(
      '1',
      'Deadlift',
      1,
      20,
      50,
      '2',
      date,
      'ooga booga'
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.exerciseDataSource).toContain(deadlift);
    });
  });

  it('should only show the selected exercise', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const studentExerciseTable = componentElement.querySelector(
      '#student-exercise-table'
    );

    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();

    fixture.detectChanges();
    console.log(component.exercise);
    console.log(
      componentElement.querySelector<HTMLElement>('#exercise-select')
        .textContent
    );
    component.exerciseDataSource.forEach((exercise: Exercise) => {
      expect(exercise.name).toEqual('Squats');
    });
  });

  it('should update reps attribute of the exercise model', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const reps = componentElement.querySelector<HTMLInputElement>(
      '#reps-input'
    );
    reps.value = '20';
    reps.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.exercise.reps).toEqual(20);
  });

  it('should update weight attribute of the exercise model', async () => {
    await fixture.whenStable();

    fixture.detectChanges();

    const weight = componentElement.querySelector<HTMLInputElement>(
      '#weight-input'
    );
    weight.value = '100';
    weight.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.exercise.weight).toEqual(100);
  });

  it('should only get today\'s exercises', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Bench Press', false);
    fixture.detectChanges();
    component.exerciseDataSource.forEach((exercise: Exercise) => {
        expect(exercise.date.getDate()).toEqual(new Date('2019-07-26').getDate());
        expect(exercise.date.getMonth()).toEqual(new Date('2019-07-26').getMonth());
        expect(exercise.date.getFullYear()).toEqual(new Date('2019-07-26').getFullYear());
    });
  });
});

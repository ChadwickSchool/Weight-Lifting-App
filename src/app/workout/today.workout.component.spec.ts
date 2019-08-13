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
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { CurrentDateSelectedService } from '../services/current-date-selected.service';
import { Group } from '../shared/models/group.model';
import { Workout } from '../shared/models/workout.model';
import WorkoutClass from '../shared/models/workout';
import { WorkoutService } from '../services/workout.service';
import { browser } from 'protractor';

describe('TodayWorkoutComponent', () => {
  let component: TodayWorkoutComponent;
  let fixture: ComponentFixture<any>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const workoutStub = {
    getTodayWorkout(group: Group): Promise<Workout> {
      return Promise.resolve(
        new WorkoutClass(
          'id',
          [
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
          ],
          new Date(),
          new Date(),
          group
        )
      );
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
      const query = this.exercises
        .filter(exercise => exercise.name === name)
        .filter(
          (exercise: Exercise) =>
            exercise.date.getMonth() === new Date().getMonth()
        );
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
      this.exercises.push(newEntry);
      component.exerciseDataSource = this.exercises;
    }
  };

  const currentGroupSelectedServiceStub = {
    getCurrentGroup(): Group {
      return TestUtils.getTestGroup();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
      ],
      declarations: [TodayWorkoutComponent],
      providers: [
        {
          provide: ExerciseService,
          useValue: exercisesStub
        },
        {
          provide: CurrentGroupSelectedService,
          useValue: currentGroupSelectedServiceStub
        },
        {
          provide: CurrentDateSelectedService
        },
        {
          provide: WorkoutService,
          useValue: workoutStub
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

  it('should display exercises correctly in the dropdown', async () => {
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    expect(selectMenu.getOptionByKey(options, 'Squats')).not.toBeNull();
    expect(selectMenu.getOptionByKey(options, 'Deadlift')).not.toBeNull();
    expect(selectMenu.getOptionByKey(options, 'Bench Press')).not.toBeNull();
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
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
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
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
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

  it('should disable next set button before all fields are filled out', () => {
    const buttonElement = componentElement.querySelector<HTMLElement>(
      '#next-btn'
    );
    expect(
      buttonElement.attributes.getNamedItem('ng-reflect-disabled').value
    ).toEqual('true');
  });

  it('should enable next set button when all fields are filled out', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const repsInput = componentDebug.query(By.css('#reps-input')).nativeElement;
    const weightInput = componentDebug.query(By.css('#weight-input'))
      .nativeElement;
    const commentsInput = componentDebug.query(By.css('#comments-input')).nativeElement;
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
    const buttonElement = componentElement.querySelector<HTMLElement>(
      '#next-btn'
    );
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();
    repsInput.value = '20';
    repsInput.dispatchEvent(new Event('input'));
    weightInput.value = '50';
    weightInput.dispatchEvent(new Event('input'));
    commentsInput.value = 'ooga booga';
    commentsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(
      buttonElement.attributes.getNamedItem('ng-reflect-disabled').value
    ).toEqual('false');
  });

  it('should be able to add student exercise to table', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const repsInput = componentDebug.query(By.css('#reps-input')).nativeElement;
    const weightInput = componentDebug.query(By.css('#weight-input'))
      .nativeElement;
    const commentsInput = componentDebug.query(By.css('#comments-input'))
      .nativeElement;
    const studentExerciseTable = componentElement.querySelector(
      '#student-exercise-table'
    );
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
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
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.exerciseDataSource).not.toBeNull();

  });

  it('should only show the selected exercise', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const studentExerciseTable = componentElement.querySelector(
      '#student-exercise-table'
    );
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();
    component.exerciseDataSource.forEach((exercise: Exercise) => {
      expect(exercise.name).toEqual('Squats');
    });
  });

  it('should only show the selected recommended exercise in the table', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const recExerciseTable = componentElement.querySelector(
      '#recommended-exercises-table'
    );
    const todaysWorkout = await workoutStub.getTodayWorkout(
      TestUtils.getTestGroup()
    );
    component.recExercisesDropdownSource = todaysWorkout.recExercise;
    component.recExercisesDataSource = [todaysWorkout.recExercise[0]];
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.selectOptionByKey(options, 'Squats', false);
    fixture.detectChanges();
    expect(recExerciseTable.textContent).toContain('Squats');
    expect(recExerciseTable.textContent).not.toContain('Bench Press');
    expect(recExerciseTable.textContent).not.toContain('Deadlift');
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
});

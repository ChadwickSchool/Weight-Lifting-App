import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWorkoutHistoryComponent } from './student-workout-history.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StudentService } from '../services/student.service';
import { ExerciseService } from '../services/exercise.service';
import { Observable, of } from 'rxjs';
import TestUtils from '../shared/utils/test-utils';
import { Exercise } from '../shared/models/exercise.model';
import { User } from '../shared/models/user.model';
import { DebugElement } from '@angular/core';
import { SelectMenuTestHelper } from '../shared/utils/select-menu-helper';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

describe('StudentWorkoutHistoryComponent', () => {
  let component: StudentWorkoutHistoryComponent;
  let fixture: ComponentFixture<StudentWorkoutHistoryComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;
  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const studentServiceStub = {
    currentStudent: '',

    getStudents(): Observable<User[]> {
      return of([TestUtils.getTestUser()]);
    }
  };

  const exerciseServiceStub = {
    exercises: [
      TestUtils.getTestExercise(
        '99',
        'Ooga',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ),
      TestUtils.getTestExercise(
        undefined,
        'Booga',
        undefined,
        undefined,
        undefined,
        undefined,
        new Date('2019-06-26'),
        undefined
      ),
    ],

    getExercise(name: string): Observable<Exercise[]> {
      const query = this.exercises.filter(exercise => exercise.name === name);
      return of(query);
    },

    getAllExercisesEver(): Observable<Exercise[]> {
      const query = this.exercises;
      return of(query);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule, AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule],
      declarations: [StudentWorkoutHistoryComponent],
      providers: [
        {
          provide: StudentService,
          useValue: studentServiceStub
        },
        {
          provide: ExerciseService,
          useValue: exerciseServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWorkoutHistoryComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
    selectMenu = new SelectMenuTestHelper(fixture);
  });

  it('should display the dropdown', () => {
    const dropdownElement = componentElement.querySelector('mat-form-field');
    expect(dropdownElement.textContent).toContain(
      'Select Which Exercise'
    );
  });

  it('should display exercises correctly in the dropdown', () => {
    component.exerciseDataSource = [
      TestUtils.getTestExercise('2', 'Ooga Booga', 1, 5, 20),
      TestUtils.getTestExercise('1', 'Booga Wooga')
    ];
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    const oogaElement = selectMenu.getOptionByKey(options, 'Ooga Booga');
    const woogaElement = selectMenu.getOptionByKey(options, 'Booga Wooga');
    expect(oogaElement).not.toBeNull();
    expect(woogaElement).not.toBeNull();
  });

  it('should not have exercises in the Your Workout table at the start', () => {
    const studentExerciseTable = componentElement.querySelector(
      '#studentHistoryTable'
    );
    expect(studentExerciseTable.textContent).not.toContain('Ooga Booga');
    expect(studentExerciseTable.textContent).not.toContain('Booga Wooga');
  });

  it('should display a students previous exercises', () => {
    component.exerciseDataSource = [
      TestUtils.getTestExercise('2', 'Ooga Booga', 1, 5, 20),
      TestUtils.getTestExercise()
    ];
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    selectMenu.getOptionByKey(options, 'Ooga Booga');
    fixture.detectChanges();
    const ooga = TestUtils.getTestExercise('2', 'Ooga Booga', 1, 5, 20);
    fixture.detectChanges();
    console.log('exercise: ' + component.exerciseDataSource);
    expect(component.exerciseDataSource).toContain(ooga);
  });
});

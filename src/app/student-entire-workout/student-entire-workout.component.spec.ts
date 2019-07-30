import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEntireWorkoutComponent } from './student-entire-workout.component';
import { MaterialModule } from '../shared/material.module';
import TestUtils from '../shared/utils/test-utils';
import { Observable, of } from 'rxjs';
import { Exercise } from '../shared/models/exercise.model';
import { ExerciseService } from '../services/exercise.service';
import { DebugElement } from '@angular/core';

describe('StudentEntireWorkoutComponent', () => {
  let component: StudentEntireWorkoutComponent;
  let fixture: ComponentFixture<StudentEntireWorkoutComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  const exercisesStub = {
    exercises: [
      TestUtils.getTestExercise(
        undefined,
        'Squat',
        undefined,
        undefined,
        undefined,
        undefined,
        new Date('2019-07-26'),
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

    getExercises(name: string): Observable<Exercise[]> {
      const query = this.exercises
        .filter(exercise => exercise.name === name)
        .filter(
          exercise =>
            exercise.date.getMonth() === new Date('2019-07-26').getMonth()
        );
      console.log('Name: ' + name);
      console.log('All exercises');
      console.log(this.exercises);
      console.log('Filtered Exercises');
      console.log(query);
      return of(query);
    },

    getAllExercises(): Observable<Exercise[]> {
      const query = this.exercises.filter(
        exercise =>
          exercise.date.getMonth() === new Date('2019-07-26').getMonth()
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
      imports: [MaterialModule],
      declarations: [StudentEntireWorkoutComponent],
      providers: [
        {
          provide: ExerciseService,
          useValue: exercisesStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEntireWorkoutComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const headerElement = componentElement.querySelector('h1');
    expect(headerElement.textContent).toContain('Your Workout');
  });

  it('should show exercises in the table', () => {
    const tableElement = componentElement.querySelector('mat-table');
    expect(tableElement.textContent).toContain('Bench Press');
    expect(tableElement.textContent).toContain('Squat');
  });
});

import { User } from '../models/user.model';
import UserClass from '../models/user';
import GroupClass from '../models/group';
import { Group } from '../models/group.model';
import { RecommendedExercise } from '../models/recommended-exercise.model';
import RecommendedExerciseClass from '../models/recommended-exercise';
import ExerciseClass from '../models/exercise';
import { StudentWorkout } from '../models/student-workout.model';
import StudentWorkoutClass from '../models/student-workout';
import { Workout } from '../models/workout.model';
import WorkoutClass from '../models/workout';
import { ComponentFixture } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { Exercise } from '../models/exercise.model';

export default class TestUtils {
  static getTestDate(year = 1937, month = 3, date = 17): Date {
    return new Date(year, month, date);
  }

  static getTestGroup(name = 'Test Group', id = '1'): Group {
    return new GroupClass(name, id);
  }

  static getTestUser(
    uid = '1',
    name = 'Test User',
    email = 'test@gmail.com',
    isAdmin = false,
  ): User {
    return new UserClass(uid, name, email, isAdmin);
  }

  static getTestRecommendedExercise(
    uid = '1',
    name = 'Test Recommended Exercise',
    sets = '2-3',
    reps = '8-10',
    weight?: string,
    rest?: string,
    coachComment?: string
  ): RecommendedExercise {
    return new RecommendedExerciseClass(
      uid,
      name,
      sets,
      reps,
      weight,
      rest,
      coachComment,
    );
  }

  static getTestExercise(
    id = '1',
    name = 'test exercise',
    setNumber = 5,
    reps = 10,
    weight = 30,
    userID = '2',
    date = new Date(),
    userComment?: string
  ): Exercise {
    return new ExerciseClass(
      id,
      name,
      setNumber,
      reps,
      weight,
      userID,
      date,
      userComment
    );
  }

  static getStudentWorkout(
    name = 'test workout',
    user = this.getTestUser(),
    date = new Date('2016-12-19'),
    exercise = [
      new ExerciseClass(
        '1',
        'Test Exercise',
        3,
        10,
        20,
        '14jafa',
        new Date('2016-12-19')
      )
    ]
  ): StudentWorkout {
    return new StudentWorkoutClass(name, user, date, exercise);
  }

  static getTestWorkout(
    id = '100',
    recExercise = [this.getTestRecommendedExercise()],
    date = this.getTestDate(),
    dateCreated = new Date('3000-01-01'),
    group = this.getTestGroup()
  ): Workout {
    return new WorkoutClass(id, recExercise, date, dateCreated, group);
  }

  static getElement(fixture: ComponentFixture<ComponentRef<any>>): HTMLElement {
    const element: HTMLElement = fixture.nativeElement as HTMLElement;
    return element;
  }
}

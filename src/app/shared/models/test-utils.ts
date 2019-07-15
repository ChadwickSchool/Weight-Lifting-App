import { User } from './user.model';
import UserClass from './user';
import GroupClass from './group';
import { Group } from './group.model';
import { RecommendedExercise } from './recommended-exercise.model';
import RecommendedExerciseClass from './recommended-exercise';
import ExerciseClass from './exercise';
import { StudentWorkout } from './student-workout.model';
import StudentWorkoutClass from './student-workout';
import { Workout } from './workout.model';
import WorkoutClass from './workout';
import { ComponentFixture } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';

export default class TestUtils {
  static getTestGroup(name = 'Basketball', id = '1'): Group {
    return new GroupClass(name, id);
  }

  static getTestUser(
    uid = '1',
    name = 'Test User',
    email = 'test@gmail.com',
    isAdmin = false,
    groups?: Array<Group>
  ): User {
    return new UserClass(uid, name, email, isAdmin, groups);
  }

  static getTestRecommendedExercise(
    uid = '1',
    name = 'Test Recommended Exercise',
    sets = '2-3',
    reps = '8-10',
    weight?: string,
    coachComment?: string
  ): RecommendedExercise {
    return new RecommendedExerciseClass(uid, name, sets, reps, weight, coachComment);
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

  static getWorkout(
    name = 'Test Workout',
    recExercise = [this.getTestRecommendedExercise()],
    users = [this.getTestUser()],
    date = new Date('3000-01-02'),
    dateCreated = new Date('3000-01-01'),
    group = this.getTestGroup()
    ): Workout {
      return new WorkoutClass(name, recExercise, users, date, dateCreated, group);
    }

    static getElement(fixture: ComponentFixture<ComponentRef<any>>): HTMLElement {
      const element: HTMLElement = fixture.nativeElement as HTMLElement;
      return element;
    }
}

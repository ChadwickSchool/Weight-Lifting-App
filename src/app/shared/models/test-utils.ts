import { User } from './user.model';
import UserClass from './user';
import GroupClass from './group';
import { Group } from './group.model';
import { Exercise } from './exercise.model';
import { RecommendedExercise } from './recommended-exercise.model';
import RecommendedExerciseClass from './recommended-exercise';
import ExerciseClass from './exercise';
import { StudentWorkout } from './student-workout.model';
import StudentWorkoutClass from './student-workout';
import { Workout } from './workout.model';
import WorkoutClass from './workout';

export default class TestUtils {
  static getTestGroup(name = 'Test Group', users?: Array<User>): Group {
    if (!users) {
      users = [
        new UserClass('Test User 1', 'test1@email.com', false),
        new UserClass('Test User 2', 'test2@email.com', false),
        new UserClass('Test User 3', 'test3@email.com', false)
      ];
    }
    return new GroupClass(name, users);
  }

  static getTestUser(
    name = 'Test User',
    email = 'test@gmail.com',
    isAdmin = false,
    groups?: Array<Group>
  ): User {
    return new UserClass(name, email, isAdmin, groups);
  }

  static getTestRecommendedExercise(
    name = 'Test Recommended Exercise',
    sets = '2-3',
    reps = '8-10',
    weight?: string,
    coachComment?: string
  ): RecommendedExercise {
    return new RecommendedExerciseClass(name, sets, reps, weight, coachComment);
  }

  static getStudentWorkout(
    name = 'test workout',
    user = this.getTestUser(),
    date = new Date('2016-12-19'),
    exercise = [
      new ExerciseClass(
        'Test Exercise',
        3,
        10,
        20,
        this.getTestUser(),
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
    date = new Date('3000-01-02')
    ): Workout {
      return new WorkoutClass(name, recExercise, users, date);
    }
}

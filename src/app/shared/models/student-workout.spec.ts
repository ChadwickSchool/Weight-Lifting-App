import StudentWorkoutClass from './student-workout';
import TestUtils from '../utils/test-utils';
import ExerciseClass from './exercise';

describe('Student Workout Class tests', () => {
  let workout: StudentWorkoutClass = null;
  beforeEach(() => {
    workout = TestUtils.getStudentWorkout();
  });

  it('should have a valid constructor', () => {
    expect(workout).not.toBe(null);
  });

  it('should set name correctly through constructor', () => {
    expect(workout.name).toEqual('test workout');
  });

  it('should set user correctly through constructor', () => {
    expect(workout.user).toEqual(TestUtils.getTestUser());
  });

  it('should set date correctly through constructor', () => {
    expect(workout.date).toEqual(new Date('2016-12-19'));
  });

  it('should set exercise correctly through constructor', () => {
    const testExercise = [
      new ExerciseClass(
        '1',
        'Test Exercise',
        3,
        10,
        20,
        'user',
        new Date('2016-12-19')
      )
    ];
    expect(workout.exercise).toEqual(testExercise);
  });

  it('should set and get name correctly', () => {
    workout.name = 'headphones';
    expect(workout.name).toEqual('headphones');
  });

  it('should set and get user correctly', () => {
    workout.user = TestUtils.getTestUser('earbuds');
    expect(workout.user).toEqual(TestUtils.getTestUser('earbuds'));
  });

  it('should set and get date correctly', () => {
    workout.date = new Date('2017-12-19');
    expect(workout.date).toEqual(new Date('2017-12-19'));
  });

  it('should set and get exercise correctly', () => {
    const testExercise = [
      new ExerciseClass(
        '1',
        'Test Exercise 2',
        3,
        10,
        20,
        'user',
        new Date('2016-12-19')
      )
    ];
    workout.exercise = testExercise;
    expect(workout.exercise).toEqual(testExercise);
  });

  afterEach(() => {
    workout = null;
  });
});

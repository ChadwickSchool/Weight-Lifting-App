import WorkoutClass from './workout';
import TestUtils from '../utils/test-utils';

describe('Workout Test Cases', () => {
  let workout: WorkoutClass = null;
  beforeEach(() => {
    workout = TestUtils.getTestWorkout();
  });

  it('should have a valid constructor', () => {
    expect(workout).not.toBe(null);
  });

  // it('should set users correctly through constructor', () => {
  //   expect(workout.users).toEqual([TestUtils.getTestUser()]);
  // });

  it('should set date correctly through constructor', () => {
    expect(workout.date).toEqual(new Date(1937, 3, 17));
  });

  it('should set recExercise correctly through constructor', () => {
    expect(workout.recExercise).toEqual([TestUtils.getTestRecommendedExercise()]);
  });

  // it('should set and get id correctly', () => {
  //   workout.id = TestUtils.;
  //   expect(workout.id).toEqual(TestUtils.getTest);
  // });

  it('should set and get date correctly', () => {
    workout.date = new Date('6969-04-20');
    expect(workout.date).toEqual(new Date('6969-04-20'));
  });

  it('should set and get recExercise correctly', () => {
    workout.recExercise = [TestUtils.getTestRecommendedExercise('hooha')];
    expect(workout.recExercise).toEqual([TestUtils.getTestRecommendedExercise('hooha')]);
  });

  afterEach(() => {
    workout = null;
  });
});

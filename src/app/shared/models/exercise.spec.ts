import ExerciseClass from './exercise';
import TestUtils from './test-utils';
import UserClass from './user';

describe('Exercise Class tests', () => {
  let exercise: ExerciseClass = null;
  beforeEach(() => {
    const user = TestUtils.getTestUser();
    exercise = new ExerciseClass(
      'Test Exercise',
      2,
      3,
      20,
      user,
      new Date('2019-01-16')
    );
  });

  afterEach(() => {
    exercise = null;
  });

  it('should have a valid constructor', () => {
    expect(exercise).not.toBeNull();
  });

  it('should set name correctly through constructor', () => {
    expect(exercise.name).toEqual('Test Exercise');
  });

  it('should set set number correctly through constructor', () => {
    expect(exercise.setNumber).toEqual(2);
  });

  it('should set reps correctly through constructor', () => {
    expect(exercise.reps).toEqual(3);
  });

  it('should set weight correctly through constructor', () => {
    expect(exercise.weight).toEqual(20);
  });

  it('should set user correctly through constructor', () => {
    expect(exercise.user).toEqual(TestUtils.getTestUser());
  });

  it('should set date correctly through constructor', () => {
    expect(exercise.date).toEqual(new Date('2019-01-16'));
  });

  it('should get and set name correctly', () => {
    exercise.name = 'Arnold Shoulder Press';
    expect(exercise.name).toEqual('Arnold Shoulder Press');
  });

  it('should get and set set number correctly', () => {
    exercise.setNumber = 5;
    expect(exercise.setNumber).toEqual(5);
  });

  it('should get and set reps correctly', () => {
    exercise.reps = 15;
    expect(exercise.reps).toEqual(15);
  });

  it('should get and set weight correctly', () => {
    exercise.weight = 2;
    expect(exercise.weight).toEqual(2);
  });

  it('should get and set user correctly', () => {
    const testUser = new UserClass('1', 'Tim', 'tim@gmail.com', true);
    exercise.user = testUser;
    expect(exercise.user).toEqual(testUser);
  });

  it('should get and set date correctly', () => {
    const currDate = new Date('2019-02-16');
    exercise.date = currDate;
    expect(exercise.date).toEqual(currDate);
  });
});

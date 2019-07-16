import RecommendedExerciseClass from './recommended-exercise';
import TestUtils from '../utils/test-utils';

describe('RecommendedExercise Class', () => {
  let recExercise: RecommendedExerciseClass = null;
  beforeEach(() => {
    recExercise = TestUtils.getTestRecommendedExercise();
  });

  afterEach(() => {
    recExercise = null;
  });

  it('should have a valid constructor', () => {
    expect(recExercise).not.toBeNull();
  });

  it('should set name correctly through constructor', () => {
    expect(recExercise).not.toBeNull('Test Recommended Exercise');
  });

  it('should set sets correctly through constructor', () => {
    expect(recExercise.sets).toEqual('2-3');
  });

  it('should set reps correctly through constructor', () => {
    expect(recExercise.reps).toEqual('8-10');
  });

  it('should set weight correctly through constructor', () => {
    recExercise = new RecommendedExerciseClass(
      '1',
      'Test Recommended Exercise',
      '2-3',
      '8-10',
      '5-10'
    );
    expect(recExercise.weight).toEqual('5-10');
  });

  it('should set coach comment correctly through constructor', () => {
    recExercise = new RecommendedExerciseClass(
      '1',
      'Test Recommended Exercise',
      '2-3',
      '8-10',
      '5-10',
      'Keep elbow straight'
    );
    expect(recExercise.coachComment).toEqual('Keep elbow straight');
  });

  it('should set name correctly', () => {
    recExercise.name = 'test shoulder press';
    expect(recExercise.name).toEqual('test shoulder press');
  });

  it('should set sets correctly', () => {
    recExercise.sets = '4-5';
    expect(recExercise.sets).toEqual('4-5');
  });

  it('should set reps correctly', () => {
    recExercise.reps = '15-20';
    expect(recExercise.reps).toEqual('15-20');
  });

  it('should set weight correctly', () => {
    recExercise.weight = '4-5';
    expect(recExercise.weight).toEqual('4-5');
  });

  it('should set coachComment correctly', () => {
    recExercise.coachComment = 'lift it';
    expect(recExercise.coachComment).toEqual('lift it');
  });

});

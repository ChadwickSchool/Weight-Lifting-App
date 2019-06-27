import RecommendedExerciseClass from './recommended-exercise';
import TestUtils from './test-utils';

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
        recExercise = new RecommendedExerciseClass('Test Recommended Exercise', '2-3', '8-10', '5-10');
        expect(recExercise.weight).toEqual('5-10');
    });

    it('should set coach comment correctly through constructor', () => {
        recExercise = new RecommendedExerciseClass('Test Recommended Exercise', '2-3', '8-10', '5-10', 'Keep elbow straight');
        expect(recExercise.coachComment).toEqual('Keep elbow straight');
    });
})
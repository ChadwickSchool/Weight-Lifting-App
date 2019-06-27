import { User } from './user.model';
import UserClass from './user';
import GroupClass from './group';
import { Group } from './group.model';
import { Exercise } from './exercise.model';
import { RecommendedExercise } from './recommended-exercise.model';
import RecommendedExerciseClass from './recommended-exercise';

export default class TestUtils {

    static getTestGroup(name='Test Group', users?: Array<User>): Group {
        if(!users) {
            users = [
                new UserClass('Test User 1', 'test1@email.com', false),
                new UserClass('Test User 2', 'test2@email.com', false),
                new UserClass('Test User 3', 'test3@email.com', false),
            ]
        }
        return new GroupClass(name, users);
    }

    static getTestUser(name='Test User', email='test@gmail.com', isAdmin=false, groups?: Array<Group>): User {
        return new UserClass(name, email, isAdmin, groups);
    }

    static getTestRecommendedExercise(
        name='Test Recommended Exercise', 
        sets='2-3', 
        reps='8-10',
        weight?: string,
        coachComment?: string
    ): RecommendedExercise {
        return new RecommendedExerciseClass(name, sets, reps, weight, coachComment);
    }
}
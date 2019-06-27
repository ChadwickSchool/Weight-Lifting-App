import { User } from './user.model';
import {Exercise} from './exercise.model';
export interface StudentWorkout {
    name: string;
    user: User;
    date: Date;
    exercise: Array<Exercise>;
}
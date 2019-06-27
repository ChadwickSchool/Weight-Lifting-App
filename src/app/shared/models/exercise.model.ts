import { User } from './user.model';

export interface Exercise {
    name: string; 
    setNumber: number;
    reps: number;
    weight: number;
    userComment: string;
    user: User;
    date: Date;
}
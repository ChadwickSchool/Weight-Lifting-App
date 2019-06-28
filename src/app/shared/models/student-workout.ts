import { User } from './user.model';
import { Exercise } from './exercise.model';

export default class StudentWorkoutClass {
  name: string;
  user: User;
  date: Date;
  exercise: Array<Exercise>;

  constructor(name: string, user: User, date: Date, exercise: Array<Exercise>) {
    this.name = name;
    this.user = user;
    this.date = date;
    this.exercise = exercise;
  }
}

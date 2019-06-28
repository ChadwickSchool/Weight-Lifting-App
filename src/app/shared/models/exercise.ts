import { User } from './user.model';

export default class ExerciseClass {
  name: string;
  setNumber: number;
  reps: number;
  weight: number;
  user: User;
  date: Date;
  userComment?: string;

  constructor(
    name: string,
    setNumber: number,
    reps: number,
    weight: number,
    user: User,
    date: Date,
    userComment?: string
  ) {
    this.name = name;
    this.setNumber = setNumber;
    this.reps = reps;
    this.weight = weight;
    this.user = user;
    this.date = date;
    this.userComment = userComment;
  }
}

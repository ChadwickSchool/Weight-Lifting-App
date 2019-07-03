import { User } from './user.model';

export default class ExerciseClass {
  uid: string;
  name: string;
  setNumber: number;
  reps: number;
  weight: number;
  user: User;
  date: Date;
  userComment?: string;

  constructor(
    uid: string,
    name: string,
    setNumber: number,
    reps: number,
    weight: number,
    user: User,
    date: Date,
    userComment?: string
  ) {
    this.uid = uid;
    this.name = name;
    this.setNumber = setNumber;
    this.reps = reps;
    this.weight = weight;
    this.user = user;
    this.date = date;
    this.userComment = userComment;
  }
}

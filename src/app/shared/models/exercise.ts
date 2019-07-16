import { User } from './user.model';

export default class ExerciseClass {
  id: string;
  name: string;
  setNumber: number;
  reps: number;
  weight: number;
  userID: string;
  date: Date;
  userComment?: string;

  constructor(
    id: string,
    name: string,
    setNumber: number,
    reps: number,
    weight: number,
    userID: string,
    date: Date,
    userComment?: string
  ) {
    this.id = id;
    this.name = name;
    this.setNumber = setNumber;
    this.reps = reps;
    this.weight = weight;
    this.userID = userID;
    this.date = date;
    this.userComment = userComment;
  }
}

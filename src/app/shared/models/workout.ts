import { RecommendedExercise } from './recommended-exercise.model';
import { User } from './user.model';
import RecommendedExerciseClass from './recommended-exercise';

export default class WorkoutClass {
  name: string;
  recExercise: Array<RecommendedExercise>;
  users: Array<User>;
  date: Date;

  constructor(
    name: string,
    recExercise: Array<RecommendedExercise>,
    users: Array<User>,
    date: Date) {
      this.name = name;
      this.recExercise = recExercise;
      this.users = users;
      this.date = date;
  }
}

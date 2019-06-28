import { User } from './user.model';
import { RecommendedExercise } from './recommended-exercise.model';
export interface Workout {
  name: string;
  recExercise: Array<RecommendedExercise>;
  users: Array<User>;
  date: Date;
}

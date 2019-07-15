import { User } from './user.model';
import { RecommendedExercise } from './recommended-exercise.model';
import { Group } from './group.model';
export interface Workout {
  name: string;
  recExercise: Array<RecommendedExercise>;
  users: Array<User>;
  date: Date;
  dateCreated: Date;
  group: Group;
}

import { User } from './user.model';
import { RecommendedExercise } from './recommended-exercise.model';
import { Group } from './group.model';
export interface Workout {
  id: string;
  recExercise: Array<RecommendedExercise>;
  date: Date;
  dateCreated: Date;
  group: Group;
}

import { RecommendedExercise } from './recommended-exercise.model';
import { User } from './user.model';
import { Group } from './group.model';

export default class WorkoutClass {
  name: string;
  recExercise: Array<RecommendedExercise>;
  users: Array<User>;
  date: Date;
  dateCreated: Date;
  group: Group;

  constructor(
    name: string,
    recExercise: Array<RecommendedExercise>,
    users: Array<User>,
    date: Date,
    dateCreated: Date,
    group: Group
  ) {
      this.name = name;
      this.recExercise = recExercise;
      this.users = users;
      this.date = date;
      this.dateCreated = dateCreated;
      this.group = group;
  }
}

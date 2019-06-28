import { RecommendedExercise } from './recommended-exercise.model';

export default class RecommendedExerciseClass {
  name: string;
  sets: string;
  reps: string;
  weight?: string;
  coachComment?: string;

  constructor(
    name: string,
    sets: string,
    reps: string,
    weight?: string,
    coachComment?: string
  ) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.coachComment = coachComment;
  }
}

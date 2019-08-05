import { RecommendedExercise } from './recommended-exercise.model';

export default class RecommendedExerciseClass implements RecommendedExercise {
  uid: string;
  name: string;
  sets: string;
  reps: string;
  weight?: string;
  rest?: string;
  coachComment?: string;

  constructor(
    uid: string,
    name: string,
    sets: string,
    reps: string,
    weight?: string,
    rest?: string,
    coachComment?: string
  ) {
    this.uid = uid;
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.rest = rest;
    this.coachComment = coachComment;
  }
}

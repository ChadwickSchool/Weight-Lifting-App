import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Injectable()
export class RecommendedExerciseService {
  recommendedExercises$: Subject<Array<RecommendedExercise>>;
  addedRecExercises: Array<RecommendedExercise>;
  constructor(private afs: AngularFirestore) {
    this.recommendedExercises$ = new Subject<Array<RecommendedExercise>>();
    this.addedRecExercises = [];
  }

  getAddedExercises(): Observable<Array<RecommendedExercise>> {
    return this.recommendedExercises$.asObservable();
  }

  addExercise(recommendedExercise: any) {
    const id = this.afs.createId();
    const recExercise = new RecommendedExerciseClass(
      id,
      recommendedExercise.name,
      recommendedExercise.sets,
      recommendedExercise.reps,
      recommendedExercise.weight,
      recommendedExercise.coachComment,
      recommendedExercise.rest
    );
    this.addedRecExercises.push(recExercise);
    this.recommendedExercises$.next(this.addedRecExercises);
  }
}

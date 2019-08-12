import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Injectable()
export class RecommendedExerciseService {
  recommendedExercises$: BehaviorSubject<Array<RecommendedExercise>>;
  addedRecExercises: Array<RecommendedExercise>;
  constructor(private afs: AngularFirestore) {
    this.recommendedExercises$ = new BehaviorSubject<Array<RecommendedExercise>>(null);
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

  updateRecommendedExercise(recommendedExercise: RecommendedExercise) {
    const recExerciseRef: AngularFirestoreDocument<RecommendedExercise>
    = this.afs.doc(`recommended-exercises/${recommendedExercise.uid}`);

    const data = {
      uid: recommendedExercise.uid,
      name: recommendedExercise.name,
      sets: recommendedExercise.sets,
      reps: recommendedExercise.reps,
      weight: recommendedExercise.weight,
      coachComment: recommendedExercise.coachComment
    };

    return recExerciseRef.set(data, { merge: true });
  }

  deleteRecommendedExercise(recommendedExercise: RecommendedExercise): void {
    this.afs.doc(`recommended-exercises/${recommendedExercise.uid}`).delete();
  }
}

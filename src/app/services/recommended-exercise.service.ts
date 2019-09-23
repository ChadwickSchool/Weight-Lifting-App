import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Injectable()
export class RecommendedExerciseService {
  recommendedExercises$: BehaviorSubject<Array<RecommendedExercise>>;
  addedRecExercises: Array<RecommendedExercise>;
  recExercisesRef: AngularFirestoreCollection<RecommendedExercise>;
  constructor(private afs: AngularFirestore) {
    this.recExercisesRef = this.afs.collection<RecommendedExercise>('recExercises');
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
      recommendedExercise.rest,
      recommendedExercise.coachComment
    );
    this.addedRecExercises.push(recExercise);
    this.recommendedExercises$.next(this.addedRecExercises);
    this.recExercisesRef.doc(id).set(Object.assign({}, recExercise));
  }

  updateRecommendedExercise(recommendedExercise: RecommendedExercise) {
    const newRecExercise = new RecommendedExerciseClass(
      recommendedExercise.uid,
      recommendedExercise.name,
      recommendedExercise.sets,
      recommendedExercise.reps,
      recommendedExercise.weight,
      recommendedExercise.rest,
      recommendedExercise.coachComment
    );

    for (let i = 0; i < this.addedRecExercises.length; i++) {
      if (recommendedExercise.uid === this.addedRecExercises[i].uid) {
        this.addedRecExercises[i] = newRecExercise;
      }
    }
  }

  deleteRecommendedExercise(recommendedExercise: RecommendedExercise): void {
    // this.afs.doc(`recommended-exercises/${recommendedExercise.uid}`).delete();
    for (let i = 0; i < this.addedRecExercises.length; i++) {
      if (recommendedExercise.uid === this.addedRecExercises[i].uid) {
        this.addedRecExercises.splice(i, 1);
      }
    }
  }
}

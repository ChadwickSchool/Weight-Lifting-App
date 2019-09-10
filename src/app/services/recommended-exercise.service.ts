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
    console.log('Adding exercise');
    const recExerciseRef: AngularFirestoreDocument<RecommendedExercise>
    = this.afs.doc(`recommended-exercises/${recommendedExercise.uid}`);
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
    console.log(recExercise);
    this.recommendedExercises$.next(this.addedRecExercises);
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

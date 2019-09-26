import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Injectable()
export class RecommendedExerciseService {
  recommendedExercises$: BehaviorSubject<Array<RecommendedExercise>>;
  addedRecExercises: Array<RecommendedExercise>;
  recExerciseNames: Array<string>;
  recExercisesRef: AngularFirestoreCollection<RecommendedExercise>;
  constructor(private afs: AngularFirestore) {
    this.recExercisesRef = this.afs.collection<RecommendedExercise>(
      'recExercises'
    );
    this.recommendedExercises$ = new BehaviorSubject<
      Array<RecommendedExercise>
    >(null);
    this.addedRecExercises = [];
    this.recExerciseNames = [];
  }

  getAddedExercises(): Observable<Array<RecommendedExercise>> {
    return this.recommendedExercises$.asObservable();
  }

  addExerciseLocal(recommendedExercise: any) {
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
  }

  async getExercisesDatabase(): Promise<Array<string>> {
    // this.afs.collection<RecommendedExercise>('recExercises').valueChanges().subscribe(e => console.log(e));
    await this.afs.collection<RecommendedExercise>('recExercises').valueChanges().subscribe(e => e
      .forEach(element => {
      this.recExerciseNames.push(element.name);
      }
    ));
    console.log(this.recExerciseNames);
    return this.recExerciseNames;
  }

  addExerciseDatabase(recommendedExercise: Array<RecommendedExercise>) {
    // console.log('recExercises:' + recommendedExercise);
    recommendedExercise.forEach(recommendedExercise => {
      if (recommendedExercise.coachComment === '') {
        recommendedExercise.coachComment = '';
      }
      if (recommendedExercise.rest === '') {
        recommendedExercise.rest = '';
      }
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
      this.recExercisesRef.doc(id).set(Object.assign({}, recExercise));
    });
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

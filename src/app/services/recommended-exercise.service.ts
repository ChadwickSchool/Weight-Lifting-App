import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ChildActivationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Injectable()
export class RecommendedExerciseService {
  recommendedExercisesRef: AngularFirestoreCollection<RecommendedExercise>;
  recommendedExercises: Observable<RecommendedExercise[]>;
  constructor(private afs: AngularFirestore) {
    this.recommendedExercisesRef = afs.collection<RecommendedExercise>(
      'recommended-exercises'
    );
    this.recommendedExercises = this.recommendedExercisesRef.valueChanges();
  }

  getAddedExercises(): Observable<any> {
    this.recommendedExercises.subscribe(result => console.log(result));
    return this.recommendedExercises;
    // return this.afs.list('exercises').valueChanges();
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
    console.log(recExercise);
    this.recommendedExercisesRef.doc(id).set(Object.assign({}, recExercise));
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

  // updateExercise(recommendedExercise: RecommendedExercise) {
  //   console.log('Updating exercise');
  //   this.recommendedExercisesDoc = this.afs.doc<RecommendedExercise>(`student-exercises/${recommendedExercise.uid}`);
  //   this.recommendedExercisesDoc.update(recommendedExercise);
  //   }

  // this.afs.object('exercises/' + key).update(exercise);
}

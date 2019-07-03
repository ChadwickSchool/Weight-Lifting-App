import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ChildActivationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Exercise } from '../shared/models/exercise.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import ExercisesClass from '../shared/models/exercise';

@Injectable()
export class ExerciseService {
  exercisesRef: AngularFirestoreCollection<Exercise>;
  exercisesDoc: AngularFirestoreDocument<Exercise>;
  exercises: Observable<Exercise[]>;
  constructor(private afs: AngularFirestore) {
    this.exercisesRef = afs.collection<Exercise>(
      'exercises'
    );
    this.exercises = this.exercisesRef.valueChanges();

  }

  getAddedExercises(): Observable<any> {
    // this.exercises.subscribe(result => console.log(result));
    return this.exercises;
    // return this.afs.list('exercises').valueChanges();
  }

  addExercise(exercises: any) {
    const id = this.afs.createId();
    const exercise = new ExercisesClass(
      id,
      exercises.name,
      exercises.setNumber,
      exercises.reps,
      exercises.weight,
      exercises.user,
      exercises.date,
      exercises.comment
    );
    this.exercisesRef.doc(id).set(Object.assign({}, exercise));
  }

  updateExercise(exercises: Exercise) {
    console.log('Updating exercise');
    this.exercisesDoc = this.afs.doc<Exercise>(`student-exercises/${exercises.uid}`);
    this.exercisesDoc.update(exercises);
    }

    // this.afs.object('exercises/' + key).update(exercise);
  }

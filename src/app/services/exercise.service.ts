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
import { AuthService } from './auth.service';

@Injectable()
export class ExerciseService {
  exercisesRef: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.exercisesRef = afs.collection<Exercise>(
      'exercises'
    );
    this.exercises = this.exercisesRef.valueChanges();
  }

  getAddedExercises(): Observable<any> {
    return this.exercises;
  }

  addExercise(exercises: any, setNumber: number) {
    const id = this.afs.createId();
    const exercise = new ExercisesClass(
      id,
      exercises.name,
      setNumber,
      exercises.reps,
      exercises.weight,
      this.authService.getUserID(),
      new Date(),
      exercises.comment
    );
    console.log(exercise);
    this.exercisesRef.doc(id).set(Object.assign({}, exercise));
  }

  // updateExercise(exercises: Exercise) {
  //   console.log('Updating exercise');
  //   this.exercisesDoc = this.afs.doc<Exercise>(`student-exercises/${exercises.id}`);
  //   this.exercisesDoc.update(exercises);
  //   }

    // this.afs.object('exercises/' + key).update(exercise);
  }

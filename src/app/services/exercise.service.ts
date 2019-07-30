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
import Utils from '../shared/utils/utils';

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

  // getAddedExercises(): Observable<any> {
  //   return this.exercises;
  // }

  getExercises(name: string): Observable<Exercise[]> {
    const todayDate = Utils.getSimplifiedDate(new Date());
    const query = this.afs.collection<Exercise>('exercises', ref => ref
    .where('name', '==', name)
      .where('date', '>=', todayDate
      ));
    return query.valueChanges();
  }

  getAllExercises(): Observable<Exercise[]> {
    const todayDate = Utils.getSimplifiedDate(new Date());
    const query = this.afs.collection<Exercise>('exercises', ref => ref
      .where('date', '>=', todayDate));
    return query.valueChanges();
  }

  addExercise(exercise: any, setNumber: number) {
    const id = this.afs.createId();
    const newEntry = new ExercisesClass(
      id,
      exercise.name,
      setNumber,
      exercise.reps,
      exercise.weight,
      this.authService.getUserID(),
      new Date(),
      exercise.userComment
    );
    this.exercisesRef.doc(id).set(Object.assign({}, newEntry));
  }

  updateExercise(exercise: Exercise) {
    const exerciseRef: AngularFirestoreDocument<Exercise> = this.afs.doc(
      `exercises/${exercise.id}`
    );

    const data = {
      id: exercise.id,
      name: exercise.name,
      setNumber: exercise.setNumber,
      reps: exercise.reps,
      weight: exercise.weight,
      userID: exercise.userID,
      date: exercise.date,
      userComment: exercise.userComment
    };

    return exerciseRef.set(data, { merge: true });
    }
  }

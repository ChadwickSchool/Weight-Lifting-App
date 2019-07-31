import { Injectable } from '@angular/core';
import { Workout } from '../shared/models/workout.model';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Group } from '../shared/models/group.model';
import { Observable } from 'rxjs';
import WorkoutClass from '../shared/models/workout';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import Utils from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workoutsRef: AngularFirestoreCollection<Workout>;
  workouts: Observable<Workout[]>;
  constructor(private afs: AngularFirestore) {
    this.workoutsRef = afs.collection<Workout>('workouts');
    this.workouts = this.workoutsRef.valueChanges();
  }

  saveWorkout(
    name: string,
    recExercise: Array<RecommendedExercise>,
    dueDate: Date,
    group: Group
  ): void {
    const id = this.afs.createId();
    const todayDate = Utils.getSimplifiedDate(new Date());
    const newWorkout = new WorkoutClass(
      id,
      name,
      recExercise,
      dueDate,
      todayDate,
      group
    );
    this.workoutsRef.doc(id).set(Object.assign({}, newWorkout));
  }
}

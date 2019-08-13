import { Injectable } from '@angular/core';
import { Workout } from '../shared/models/workout.model';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { Group } from '../shared/models/group.model';
import { Observable, of } from 'rxjs';
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

  async getTodayWorkout(group: Group): Promise<Workout> {
    const todayDate = Utils.getSimplifiedDate(new Date());
    const query = this.workoutsRef.ref
      .where('group', '==', group)
      .where('date', '==', todayDate)
      .limit(1);
    let result;
    await query.get().then(snapshot => {
      if (snapshot.empty) {
        return;
      }

      snapshot.forEach(doc => {
        result = doc.data() as Workout;
      });
    });
    return result;
  }

  saveWorkout(
    recExercise: Array<RecommendedExercise>,
    dueDate: Date,
    group: Group
  ): void {
    const id = this.afs.createId();
    const todayDate = Utils.getSimplifiedDate(new Date());
    const workout = new WorkoutClass(
      id,
      recExercise,
      dueDate,
      todayDate,
      group
    );
    const exercises = recExercise.map(obj => {
      return Object.assign({}, obj);
    });
    const groupJSON = Object.assign({}, group);
    const newWorkout: Workout = {
      id: workout.id,
      recExercise: exercises,
      date: workout.date,
      dateCreated: workout.dateCreated,
      group: groupJSON
    };

    this.workoutsRef.doc(id).set(Object.assign({}, newWorkout));
  }
}

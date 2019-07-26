import { Injectable } from '@angular/core';
import { Workout } from '../shared/models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Array<Workout>;
  constructor() { }

  saveWorkout(workout: Workout): void {

  }
}

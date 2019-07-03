import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { WorkoutElement } from '../workout.table.interface';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { ExerciseService } from '../services/exercise.service';
import ExerciseClass from '../shared/models/exercise';
import { Exercise } from '../shared/models/exercise.model';

export interface RecExerciseData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  coachComment: string;
  rest: string;
}

export interface ExerciseData {
  name: string;
  set: number;
  reps: number;
  weight: number;
  userComment: string;
}

export class ExpansionOverviewExample {
  panelOpenState = false;
}

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})

export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: RecExerciseData;
  exerciseDataSource: ExerciseData;
  constructor(
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService
  ) {}
  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['name', 'sets', 'reps', 'weight'];

  ngOnInit() {
    this.showExercises();
  }

  showExercises() {
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.recExercisesDataSource = recExercises;
    });
    this.exerciseService.getAddedExercises().subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

  submitForm() {
    this.addExercise();
  }

  addExercise() {
    if (this.exerciseDataSource.userComment === '') {
      this.exerciseDataSource.userComment = 'none';
    }
    this.exerciseService.addExercise(this.exerciseDataSource);
  }
}

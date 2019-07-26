import { Component, OnInit } from '@angular/core';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../shared/models/exercise.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { Observable, of } from 'rxjs';

export class ExpansionOverviewExample {
  panelOpenState = false;
}

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})
export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: Array<RecommendedExercise>;
  exerciseDataSource: Array<Exercise>;
  setNumber: number;
  constructor(
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService,
  ) {
    this.setNumber = 1;
  }
  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    comment: ''
  };



  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['setNumber', 'reps', 'weight', 'comments'];

  ngOnInit() {
    this.showExercises();
    // this.exerciseDataSource = of(null);
  }

  showExercises() {
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.recExercisesDataSource = recExercises;
    });
    this.exerciseService.getExercises(this.exercise.name).subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

  updateStudentTable() {
    this.exerciseService.getExercises(this.exercise.name).subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

  submitForm() {
    this.addExercise();
  }

  addExercise() {
    this.setNumber = this.exerciseDataSource.length ? this.exerciseDataSource[this.exerciseDataSource.length - 1].setNumber + 1: 1;
    if (this.exercise.comment === '') {
      this.exercise.comment = 'none';
    }
    this.exerciseService.addExercise(this.exercise, this.setNumber);
    console.log('submit');
  }
}

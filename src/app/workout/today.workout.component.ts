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
  exerciseDataSource: Observable<Array<Exercise>>;
  setNumber: number;
  constructor(
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService,
  ) {
    this.setNumber = 0;
  }
  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    comment: ''
  };



  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['name', 'setNumber', 'reps', 'weight', 'comments'];

  ngOnInit() {
    this.showExercises();
    this.exerciseDataSource = of(null);
  }

  showExercises() {
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.recExercisesDataSource = recExercises;
    });
    // this.exerciseService.getExercises(this.exercise.name).subscribe(exercises => {
    //   this.exerciseDataSource = exercises;
    // });
  }

  updateStudentTable() {
    this.exerciseDataSource = this.exerciseService.getExercises(this.exercise.name);
    console.log('called update student table');
  }



  submitForm() {
    this.addExercise();
  }

  addExercise() {
    if (this.exercise.comment === '') {
      this.exercise.comment = 'none';
    }
    this.setNumber++;
    if (this.setNumber > Number((this.recExercisesDataSource.find(element =>
          element.name === this.exercise.name
        )).sets)) {
      this.setNumber = 1;
    }
    this.exerciseService.addExercise(this.exercise, this.setNumber);
    console.log('submit');
  }
}

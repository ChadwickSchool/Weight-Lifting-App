import { Component, OnInit } from '@angular/core';
import { Exercise } from '../shared/models/exercise.model';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'wla-student-entire-workout',
  templateUrl: './student-entire-workout.component.html',
  styleUrls: ['./student-entire-workout.component.scss']
})
export class StudentEntireWorkoutComponent implements OnInit {
  exerciseDataSource: Array<Exercise>;

  constructor(private exerciseService: ExerciseService,) { }

  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    comment: ''
  };

  displayedExerciseColumns = ['name', 'setNumber', 'reps', 'weight', 'comments'];
  ngOnInit() {
      this.showExercises();
  }

  showExercises() {
    this.exerciseService.getAllExercises().subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

}

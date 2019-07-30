import { Component, OnInit } from '@angular/core';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../shared/models/exercise.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { tap } from 'rxjs/operators';

export class ExpansionOverviewExample {
  panelOpenState = false;
}

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})
export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: Observable<Array<RecommendedExercise>>;
  exerciseDataSource: Observable<Array<Exercise>>;
  setNumber: number;
  constructor(
    public dialog: MatDialog,
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService
  ) {
    this.setNumber = 1;
  }
  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    userComment: ''
  };

  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['setNumber', 'reps', 'weight', 'comment', 'edit'];

  ngOnInit() {
    // this.showExercises();
    this.recExercisesDataSource = this.recExerciseService.getAddedExercises();
    this.exerciseDataSource = of(null);
  }

  openDialog(exercise: Exercise): void {
    console.log('selected exercise: ' + exercise.id);
    const dialogRef = this.dialog.open(EditExerciseComponent, {
      height: '400px',
      width: '600px',
      data: exercise
    });
  }

  async clickDropdown() {
    console.log('Clicked Dropdown');
    const exercises = await this.recExercisesDataSource.toPromise();
    console.log(exercises);
    console.log('Exiting dropdown');
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.deleteExercise(exercise);
  }

  // showExercises() {
  //   this.recExerciseService.getAddedExercises().subscribe(recExercises => {
  //     this.recExercisesDataSource = recExercises;
  //   });
  //   this.exerciseService
  //     .getExercises(this.exercise.name)
  //     .subscribe(exercises => {
  //       this.exerciseDataSource = exercises;
  //     });
  // }

  // updateStudentTable() {
  //   this.exercise.reps = 0;
  //   this.exercise.weight = 0;
  //   this.exerciseService
  //     .getExercises(this.exercise.name)
  //     .subscribe(exercises => {
  //       this.exerciseDataSource = exercises;
  //     });
  // }

  updateStudentTable() {
    this.exercise.reps = 0;
    this.exercise.weight = 0;
    this.exerciseDataSource = this.exerciseService.getExercises(
      this.exercise.name
    );
  }

  submitForm() {
    this.addExercise();
  }

  addExercise() {
    this.exerciseDataSource.pipe(
      tap(exercises => {
        this.setNumber = exercises.length
          ? exercises[exercises.length - 1].setNumber + 1
          : 1;
        if (this.exercise.userComment === '') {
          this.exercise.userComment = 'none';
        }
        this.exerciseService.addExercise(this.exercise, this.setNumber);
      })
    );
  }
}

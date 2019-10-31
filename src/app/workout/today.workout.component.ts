import { Component, OnInit } from '@angular/core';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../shared/models/exercise.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { Observable, of, Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { tap } from 'rxjs/operators';
import { WorkoutService } from '../services/workout.service';
import { Group } from '../shared/models/group.model';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})
export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: Array<RecommendedExercise>;
  recExercisesDropdownSource: Array<RecommendedExercise>;
  currentExerciseDataSource: Array<Exercise>;
  exerciseDataSource: Array<Exercise>;
  setNumber: number;
  selectedExercise: Subject<RecommendedExercise>;
  selectedGroup: Group;
  constructor(
    public dialog: MatDialog,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private groupSelectedService: CurrentGroupSelectedService
  ) {
    this.setNumber = 0;
  }
  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    userComment: ''
  };

  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['setNumber', 'reps', 'weight', 'comment', 'edit'];

  async ngOnInit() {
    // this.showExercises();
    this.selectedGroup = this.groupSelectedService.getCurrentGroup();
    // this.currentExerciseDataSource = of(null);
    this.selectedExercise = new Subject<RecommendedExercise>();
    await this.workoutService
      .getTodayWorkout(this.selectedGroup)
      .then(workout => (this.recExercisesDropdownSource = workout.recExercise));
  }

  getSelectedRecExercise(): Observable<Array<RecommendedExercise>> {
    const result = new Subject<Array<RecommendedExercise>>();
    return result.asObservable();
  }

  openDialog(exercise: Exercise): void {
    const dialogRef = this.dialog.open(EditExerciseComponent, {
      height: '400px',
      width: '600px',
      data: exercise
    });
    this.exerciseService.getAddedExercises().subscribe(exercises => {
      this.currentExerciseDataSource = exercises;
    });
  }

  submitForm() {
    this.addExercise();
  }

  showExercises() {
    this.exerciseService
      .getExercises(this.exercise.name)
      .subscribe(exercises => {
        this.currentExerciseDataSource = exercises;
      });
  }

  resetSetCounter() {
    if (this.setNumber !== 0) {
      // tslint:disable-next-line: no-unused-expression
      console.log('data: ' + JSON.stringify(this.exerciseDataSource));
      const found = this.exerciseDataSource.find(element => {
        if (element.name === this.exercise.name) {
          return true;
        }
        return false;
      });
      console.log('Found is');
      console.log(found);
      if (found) {
        console.log('Found set: ' + found.setNumber);
        this.setNumber = found.setNumber;
      } else {
        this.setNumber = 0;
      }
      console.log('set: ' + this.setNumber);
      this.setNumber++;
    } else {
      this.setNumber = 1;
    }
    console.log('final set: ' + this.setNumber);
  }

  updateStudentTable() {
    this.exercise.reps = 0;
    this.exercise.weight = 0;
    this.exerciseService
      .getExercises(this.exercise.name)
      .subscribe(exercises => {
        this.currentExerciseDataSource = exercises;
      });
    this.workoutService
      .getTodayWorkout(this.selectedGroup)
      .then(
        workout =>
          (this.recExercisesDataSource = workout.recExercise.filter(
            recExercise => recExercise.name === this.exercise.name
          ))
      );

    this.updateDataSource();
  }

  updateDataSource(): void {
    this.exerciseService.getAddedExercisesTimestap().subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

  addExercise() {
    if (this.exercise.userComment === '') {
      this.exercise.userComment = 'none';
    }
    this.exerciseService.addExercise(this.exercise, this.setNumber);
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.deleteExercise(exercise);
  }
}

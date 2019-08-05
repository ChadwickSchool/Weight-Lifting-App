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
  exerciseDataSource: Array<Exercise>;
  setNumber: number;
  selectedExercise: Subject<RecommendedExercise>;
  selectedGroup: Group;
  constructor(
    public dialog: MatDialog,
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private groupSelectedService: CurrentGroupSelectedService
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

  async ngOnInit() {
    // this.showExercises();
    this.selectedGroup = this.groupSelectedService.getCurrentGroup();
    this.recExercisesDataSource = this.recExerciseService.getAddedExercises();
    // this.exerciseDataSource = of(null);
    this.selectedExercise = new Subject<RecommendedExercise>();
    await this.workoutService.getTodayWorkout(this.selectedGroup);
    // this.workoutService.getTodayWorkout(this.selectedGroup).subscribe(workout => {
    //   this.recExercisesDataSource = of(workout.recExercise);
    // });
  }

  getSelectedRecExercise(): Observable<Array<RecommendedExercise>> {
    const result = new Subject<Array<RecommendedExercise>>();

    console.log(result);
    return result.asObservable();
  }

  openDialog(exercise: Exercise): void {
    console.log('selected exercise: ' + exercise.id);
    const dialogRef = this.dialog.open(EditExerciseComponent, {
      height: '400px',
      width: '600px',
      data: exercise
    });
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.deleteExercise(exercise);
  }

  showExercises() {
    // this.recExerciseService.getAddedExercises().subscribe(recExercises => {
    //   this.recExercisesDataSource = recExercises;
    // });
    this.exerciseService
      .getExercises(this.exercise.name)
      .subscribe(exercises => {
        this.exerciseDataSource = exercises;
      });
  }

  updateStudentTable() {
    this.exercise.reps = 0;
    this.exercise.weight = 0;
    this.exerciseService
      .getExercises(this.exercise.name)
      .subscribe(exercises => {
        this.exerciseDataSource = exercises;
      });
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.selectedExercise.next(
        recExercises.find(recExercise => {
          return recExercise.name === this.exercise.name;
        })
      );
    });
  }

  submitForm() {
    this.addExercise();
  }

  addExercise() {
    if (this.exercise.userComment === '') {
      this.exercise.userComment = 'none';
    }
    this.setNumber++;
    // if (this.setNumber > Number((this.recExercisesDataSource.find(element =>
    //       element.name === this.exercise.name
    //     )).sets)) {
    //   this.setNumber = 1;
    // }
    this.exerciseService.addExercise(this.exercise, this.setNumber);
    console.log('submit');
  }
}

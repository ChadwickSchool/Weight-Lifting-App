import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { DataService } from '../data/data.service';
import { RecommendedExercisesDialogComponent } from '../recommended-exercises-dialog/recommended-exercises-dialog.component';
import { Router } from '@angular/router';
import { Group } from '../shared/models/group.model';
import TestUtils from '../shared/utils/test-utils';
import { Observable } from 'rxjs';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { CurrentDateSelectedService } from '../services/current-date-selected.service';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';

export interface ExerciseData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  coachComment: string;
  rest: string;
}

@Component({
  selector: 'wla-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.scss']
})
export class CreateWorkoutComponent implements OnInit {
  recExercises$: Observable<Array<ExerciseData>>;
  date$: Observable<Date>;
  group$: Observable<Group>;
  constructor(
    public dialog: MatDialog,
    private recExerciseService: RecommendedExerciseService,
    private router: Router,
    private groupSelectedService: CurrentGroupSelectedService,
    private dateSelectedService: CurrentDateSelectedService
  ) {

  }

  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest', 'edit'];

  openDialog(): void {
    const dialogRef = this.dialog.open(RecommendedExercisesDialogComponent, {
      width: '600px',
      data: 'Add Exercise'
    });
  }

  ngOnInit() {
    this.recExercises$ = this.recExerciseService.getAddedExercises();
    this.group$ = this.groupSelectedService.getCurrentGroup();
    this.date$ = this.dateSelectedService.getCurrentDate();
  }

  saveWorkout() {
    this.router.navigate(['']);
  }

  deleteRecExercise(recommendedExercise: RecommendedExercise): void {
    this.recExerciseService.deleteRecommendedExercise(recommendedExercise);
  }
}

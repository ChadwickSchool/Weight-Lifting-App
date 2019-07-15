import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { DataService } from '../data/data.service';
import { RecommendedExercisesDialogComponent } from '../recommended-exercises-dialog/recommended-exercises-dialog.component';
import { Router } from '@angular/router';

export interface ExerciseData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  coachComment: string;
  rest: string;
}

@Component({
  selector: 'wla-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  recExercisesDataSource: ExerciseData[];
  dataService: DataService;
  dataSource: Array<ExerciseData>;
  constructor(public dialog: MatDialog, private recExerciseService: RecommendedExerciseService, private router: Router) {}


  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];

  openDialog(): void {
    const dialogRef = this.dialog.open(RecommendedExercisesDialogComponent, {
      width: '600px',
      data: 'Add Exercise'
    });
    // dialogRef.componentInstance.event.subscribe(result => {
    //   this.dataService.addPost(result.data);
    //   this.dataSource = new PostDataSource(this.dataService);
    // });
  }

  ngOnInit() {
    this.showExercises();
  }

  showExercises() {
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.recExercisesDataSource = recExercises;
    });
  }

  saveWorkout() {
    this.router.navigate(['']);
  }
}

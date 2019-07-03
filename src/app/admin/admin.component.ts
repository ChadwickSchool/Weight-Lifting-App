import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { WorkoutElement } from '../workout.table.interface';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';

export interface ExerciseData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  coachComment: string;
}

@Component({
  selector: 'wla-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  recExercisesDataSource: ExerciseData[];
  constructor(public dialog: MatDialog, private dataService: DataService, private recExerciseService: RecommendedExerciseService) {}


  displayedColumns = ['name', 'sets', 'reps', 'weight'];

  openDialog(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
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
}

// export class PostDataSource extends DataSource<any> {
//   constructor(private dataService: DataService) {
//     super();
//   }

//   connect(): Observable<WorkoutElement[]> {
//     return this.dataService.getData();
//   }
//   disconnect() {}
// }

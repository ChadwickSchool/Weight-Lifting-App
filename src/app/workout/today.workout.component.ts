import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { WorkoutElement } from '../workout.table.interface';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';


export interface RecExerciseData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
  coachComment: string;
}

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})

export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: RecExerciseData;
  constructor(
    private dataService: DataService,
    private recExerciseService: RecommendedExerciseService
  ) {}
  displayedColumns = ['name', 'sets', 'reps', 'weight'];

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

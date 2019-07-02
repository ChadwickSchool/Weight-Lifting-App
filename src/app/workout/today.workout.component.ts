import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { WorkoutElement } from '../workout.table.interface';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})
export class TodayWorkoutComponent implements OnInit {
  constructor(private dataService: DataService) {}
  displayedColumns = ['name', 'sets', 'reps', 'weight'];
  dataSource = new PostDataSource(this.dataService);

  ngOnInit() {}
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<WorkoutElement[]> {
    return this.dataService.getData();
  }
  disconnect() {}
}

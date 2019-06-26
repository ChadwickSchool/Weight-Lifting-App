import { Component, OnInit } from '@angular/core';
import {DataService} from '../data/data.service';
import {WorkoutElement} from '../workout.table.interface';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  displayedColumns = ['name', 'sets', 'reps', 'weight'];
  dataSource = new PostDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  ngOnInit() {
  }

}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<WorkoutElement[]> {
    return this.dataService.getData();
  }
  disconnect() {
  }
}

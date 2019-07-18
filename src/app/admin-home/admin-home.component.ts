import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wla-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  groups$: Observable<Array<Group>>;
  constructor(private groupService: GroupService) { }

  group = {
    name: '',
    id: ''
  };

  ngOnInit() {
    this.groups$ = this.groupService.getAddedGroups();
  }

  createWorkout() {

  }

  // showGroups() {
  //   this.groupService.getAddedGroups().subscribe(group => {
  //     this.groupsDataSource = group;
  //   });
  // }

}

import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Router } from '@angular/router';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';

@Component({
  selector: 'wla-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  groupDataSource: Array<Group>;
  isDisabled: boolean;
  constructor(
    private groupService: GroupService,
    private router: Router,
    private currentGroupSelectedService: CurrentGroupSelectedService
  ) {
    this.isDisabled = true;
  }

  group = {
    name: '',
    id: ''
  };

  ngOnInit() {
    this.showGroups();
  }

  async showGroups() {
    console.log('Called showGroups');
    this.groupDataSource = await this.groupService.getAddedGroupsDropdown();
    console.log('groups: ' + this.groupDataSource);
  }

  setCurrentGroupSelected(group: Group) {
    this.currentGroupSelectedService.setCurrentGroup(group);
  }


  // seeWorkout() {
  //   this.router.navigate(['today-workout-student']);
  // }
}

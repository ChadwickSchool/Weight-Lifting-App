import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wla-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  groupDataSource: Group;
  isDisabled: boolean;
  constructor(private groupService: GroupService, private router: Router) {
    this.isDisabled = true;
  }

  group = {
    name: '',
    id: ''
  };

  ngOnInit() {
    this.showGroups();
  }

  showGroups() {
    this.groupService.getAddedGroups().subscribe(group => {
      this.groupDataSource = group;
    });
  }

  // seeWorkout() {
  //   this.router.navigate(['today-workout-student']);
  // }
}

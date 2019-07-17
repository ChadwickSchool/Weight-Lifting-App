import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wla-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  groupDataSource: Group;
  constructor(private groupService: GroupService, private router: Router) { }

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

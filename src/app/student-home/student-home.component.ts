import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'wla-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  groupDataSource: Observable<Array<Group>>;
  isDisabled: boolean;
  constructor(private groupService: GroupService, private router: Router) {
    this.isDisabled = true;
  }

  group = {
    name: '',
    id: ''
  };

  ngOnInit() {
    // this.showGroups();
    this.groupDataSource = this.groupService.getAddedGroups();
  }

  showGroups() {
    this.groupService.getAddedGroups().subscribe(groups => {
      this.groupDataSource = groups;
    });
  }

  showDropdownInfo() {
    console.log(this.groupDataSource);
  }

}

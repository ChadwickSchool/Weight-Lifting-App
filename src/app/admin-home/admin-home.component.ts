import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { GroupService } from '../services/groups.service';
import { Observable } from 'rxjs';
import { CurrentGroupSelectedService } from '../services/current-group-selected.service';
import { CurrentDateSelectedService } from '../services/current-date-selected.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'wla-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  groups: Array<Group>;
  constructor(
    private groupService: GroupService,
    private currentGroupSelectedService: CurrentGroupSelectedService,
    private currentDateSelectedService: CurrentDateSelectedService
  ) {}

  group = {
    name: '',
    id: ''
  };

  async ngOnInit() {
    this.groups = await this.groupService.getAddedGroupsDropdown();
  }

  createWorkout() {}

  setCurrentGroupSelected(group: Group) {
    this.currentGroupSelectedService.setCurrentGroup(group);
  }

  setCurrentDateSelected(event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    this.currentDateSelectedService.setCurrentDate(date);
  }
}

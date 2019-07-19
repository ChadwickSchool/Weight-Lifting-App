import { Injectable } from "@angular/core";
import { Group } from '../shared/models/group.model';

@Injectable()
  export class CurrentGroupSelectedService {
    currentGroup: Group;
    setCurrentGroup(group: Group) {
      this.currentGroup = group;
    }

    getCurrentGroup(): Group {
      return this.currentGroup;
    }
  }

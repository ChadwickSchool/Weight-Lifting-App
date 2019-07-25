import { Injectable, Inject } from '@angular/core';
import { Group } from '../shared/models/group.model';
import { Observable, of } from 'rxjs';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class CurrentGroupSelectedService {
  private key = 'currentGroup';

  constructor(
    @Inject(SESSION_STORAGE)
    private webstorage: StorageService,
  ) {}

  setCurrentGroup(group: Group) {
    this.webstorage.set(this.key, group);
  }

  getCurrentGroup(): Observable<Group> {
    return of(this.webstorage.get(this.key));
  }
}

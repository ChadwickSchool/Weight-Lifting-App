import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Group } from '../shared/models/group.model';
import { Observable } from 'rxjs';
import GroupClass from '../shared/models/group';
import { take } from 'rxjs/operators';

@Injectable()
export class GroupService {
  groupsRef: AngularFirestoreCollection<Group>;
  groups: Observable<Group[]>;

  constructor(private afs: AngularFirestore) {
    this.groupsRef = afs.collection<Group>(
      'groups'
    );
    this.groups = this.groupsRef.valueChanges();
  }

  getAddedGroups(): Observable<Group[]> {
    return this.groups;
  }

  getAddedGroupsDropdown(): Promise<Group[]> {
    console.log('getAddedGroupsDropdown() called');
    return this.groups.pipe(take(1)).toPromise();
  }

  addGroup(group: any) {
    const id = this.afs.createId();
    const currentGroup = new GroupClass(
      group.name,
      id
    );
    this.groupsRef.doc(id).set(Object.assign({}, currentGroup));
  }

}

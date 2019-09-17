import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  // admin: boolean;
  constructor(private afs: AngularFirestore) {
    this.usersRef = this.afs.collection<User>('users');
    this.users = this.usersRef.valueChanges();
  }

  async isAdmin(id: string): Promise<boolean> {
    console.log('id is ' + id);
    let admin: boolean;
    await this.usersRef
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        tap(user => {
          console.log(user);
          admin = user.isAdmin;
        })
      )
      .toPromise();
    console.log('found admin');
    return admin;
  }
}

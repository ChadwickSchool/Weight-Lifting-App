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
    let admin: boolean;
    await this.usersRef
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        tap(user => {
          admin = user.isAdmin;
        })
      )
      .toPromise();
    console.log('admin: ' + admin);
    return admin;
  }

  async getCurrentUser(idToken: string): Promise<User> {
    return await this.usersRef.doc<User>(idToken).valueChanges().toPromise();
  }
}

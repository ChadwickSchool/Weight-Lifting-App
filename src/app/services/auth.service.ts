import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import UserClass from '../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;
  userID: string;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.userID = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.userID = credential.user.uid;
    // check to see if the user exists in the database
    // if user is not in database
    const userRef: AngularFirestoreDocument = this.afs.doc<User>(
      `users/${credential.user.uid}`
    );

    userRef.valueChanges().subscribe(user => {
      this.userID = credential.user.uid;
      if (user) {
        return user;
      } else {
        return this.createStudentUser(credential.user);
      }
    });
  }

  getFirebaseUserID(): string {
    return this.userID;
  }

  getAuthenticatedUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  private createStudentUser(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    this.userID = user.uid;
    const data = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isAdmin: false
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    this.userID = undefined;
    await this.afAuth.auth.signOut();
  }
}

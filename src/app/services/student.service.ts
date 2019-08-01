import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentsRef: AngularFirestoreCollection<User>;
  students: Observable<User[]>;
  constructor(private afs: AngularFirestore) {
    this.studentsRef = this.afs.collection<User>('students');
    this.students = this.studentsRef.valueChanges();
  }

  getStudents(): Observable<User[]> {
    return this.afs
      .collection<User>('students')
      .valueChanges()
      .pipe(map(students => students.filter(s => !s.isAdmin)));
  }
}

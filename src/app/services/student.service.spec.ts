import { TestBed, inject } from '@angular/core/testing';

import { StudentService } from './student.service';
import TestUtils from '../shared/utils/test-utils';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../shared/models/user.model';
import { from } from 'rxjs';

const input: User[][] = [
  [
    TestUtils.getTestUser(),
    TestUtils.getTestUser('2', 'tim', 'j@gmail', true),
    TestUtils.getTestUser('3')
  ]
];

const data = from(input);

const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
};

const angularFirestoreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('Student Service Tests', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StudentService,
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub
        }
      ]
    })
  );

  it('should create the Student Service', inject(
    [StudentService],
    (service: StudentService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('can get a list of students', () => {
    it('should fetch a list of all students', done => {
      inject([StudentService], (service: StudentService) => {
        const users = service.getStudents();
        users.subscribe({
          next: s => {
            const students = s;
            expect(students.length).toBeGreaterThanOrEqual(2);
            expect(students.every(st => !st.isAdmin)).toBe(true);
          },
          complete: () => done()
        });
      })();
    });
  });
});

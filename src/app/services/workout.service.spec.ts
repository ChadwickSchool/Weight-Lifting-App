import { TestBed, async } from '@angular/core/testing';

import { WorkoutService } from './workout.service';
import TestUtils from '../shared/utils/test-utils';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Workout } from '../shared/models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  const input: Array<Workout> = [];
  const data = of(input);

  const docStub = {
    set(workout: Workout) {
      input.push(workout);
    }
  };

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    doc: jasmine.createSpy('doc').and.returnValue(docStub)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
    createId(): string {
      return '100';
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: angularFirestoreStub }]
    }).compileComponents();
    service = TestBed.get(WorkoutService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(angularFirestoreStub.collection).toHaveBeenCalledWith('workouts');
  });

  it('should save workout to database', () => {
    service.saveWorkout(
      [TestUtils.getTestRecommendedExercise()],
      TestUtils.getTestDate(),
      TestUtils.getTestGroup()
    );
    expect(collectionStub.doc).toHaveBeenCalled();
    expect(input[0].id).toBe('100');
  });
});

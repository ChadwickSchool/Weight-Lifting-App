import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayWorkoutComponent } from './today.workout.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { of, Observable } from 'rxjs';
import { ExerciseService } from '../services/exercise.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import TestUtils from '../shared/utils/test-utils';

describe('TodayWorkoutComponent', () => {
  let component: TodayWorkoutComponent;
  let fixture: ComponentFixture<TodayWorkoutComponent>;

  const recExercisesStub = {
    getAddedExercises(): Observable<any> {
      return of([TestUtils.getTestRecommendedExercise(), TestUtils.getTestRecommendedExercise()]);
    }
  };

  const exercisesStub = {
    getAddedExercises(): Observable<any> {
      return of([TestUtils.getTestExercise(), TestUtils.getTestExercise()]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, NoopAnimationsModule ],
      declarations: [ TodayWorkoutComponent ],
      providers: [
        {
          provide: RecommendedExerciseService,
          useValue: recExercisesStub
        },
        {
          provide: ExerciseService,
          useValue: exercisesStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

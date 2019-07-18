import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CreateWorkoutComponent } from './create-workout.component';
import { element, by } from 'protractor';
import { MaterialModule } from '../shared/material.module';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { Router } from '@angular/router';
import TestUtils from '../shared/utils/test-utils';
import { of, Observable } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('CreateWorkoutComponent', () => {
  let component: CreateWorkoutComponent;
  let fixture: ComponentFixture<CreateWorkoutComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  const recommendedExerciseStub = {
    getAddedExercises(): Observable<any> {
      return of([
        TestUtils.getTestRecommendedExercise('1', 'squat'),
        TestUtils.getTestRecommendedExercise('2', 'benchpress'),
        TestUtils.getTestRecommendedExercise('3', 'pullups')
      ]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ CreateWorkoutComponent ],
      providers: [
        {
          provide: RecommendedExerciseService,
          useValue: recommendedExerciseStub
        },
        {
          provide: Router
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkoutComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selected group', fakeAsync(() => {
    component.group = TestUtils.getTestGroup('Basketball');
    fixture.detectChanges();
    const headerElement = componentElement.querySelector('h1');
    tick();
    expect(headerElement.textContent).toContain('Basketball');
  }));
});

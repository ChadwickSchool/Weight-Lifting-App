import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecommendedExerciseComponent } from './edit-recommended-exercise.component';

describe('EditRecommendedExerciseComponent', () => {
  let component: EditRecommendedExerciseComponent;
  let fixture: ComponentFixture<EditRecommendedExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecommendedExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecommendedExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

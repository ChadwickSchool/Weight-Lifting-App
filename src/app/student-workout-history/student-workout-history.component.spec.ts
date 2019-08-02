import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWorkoutHistoryComponent } from './student-workout-history.component';

describe('StudentWorkoutHistoryComponent', () => {
  let component: StudentWorkoutHistoryComponent;
  let fixture: ComponentFixture<StudentWorkoutHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWorkoutHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWorkoutHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

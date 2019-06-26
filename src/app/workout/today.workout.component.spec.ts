import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayWorkoutComponent } from './today.workout.component';

describe('TodayWorkoutComponent', () => {
  let component: TodayWorkoutComponent;
  let fixture: ComponentFixture<TodayWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayWorkoutComponent ]
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

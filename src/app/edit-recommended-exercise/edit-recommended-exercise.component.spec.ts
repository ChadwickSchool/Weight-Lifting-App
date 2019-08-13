import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecommendedExerciseComponent } from './edit-recommended-exercise.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditRecommendedExerciseComponent', () => {
  let component: EditRecommendedExerciseComponent;
  let fixture: ComponentFixture<EditRecommendedExerciseComponent>;

  const recommendedExerciseServiceStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecommendedExerciseComponent ],
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef
        },
        {
          provide: MAT_DIALOG_DATA
        },
        {
          provide: RecommendedExerciseService,
          useValue: recommendedExerciseServiceStub
        }
      ]
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

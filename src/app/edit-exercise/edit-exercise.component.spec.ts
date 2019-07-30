import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseComponent } from './edit-exercise.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material';
import { ExerciseService } from '../services/exercise.service';
import TestUtils from '../shared/utils/test-utils';
import { Observable, of } from 'rxjs';
import { Exercise } from '../shared/models/exercise.model';

fdescribe('EditExerciseComponent', () => {
  let component: EditExerciseComponent;
  let fixture: ComponentFixture<EditExerciseComponent>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      declarations: [ EditExerciseComponent ],
      providers: [
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA},
        {
          provide: ExerciseService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

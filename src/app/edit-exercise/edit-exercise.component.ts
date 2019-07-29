import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseService } from '../services/exercise.service';
import { DataService } from '../data/data.service';

@Component({
  selector: 'wla-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private exerciseService: ExerciseService
  ) {}

  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    comment: ''
  };

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close();
  }

  // updateExercise() {
  //   this.exerciseService.updateExercise(this.exercise);
  // }
}

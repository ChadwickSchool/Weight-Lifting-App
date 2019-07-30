import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseService } from '../services/exercise.service';
import { DataService } from '../data/data.service';
import ExerciseClass from '../shared/models/exercise';

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
    name: this.data.name,
    reps: this.data.reps,
    weight: this.data.weight,
    comment: this.data.userComment,

  };

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close();
  }

  updateExercise() {
    this.exerciseService.updateExercise(new ExerciseClass(
      this.data.id,
      this.exercise.name,
      this.data.setNumber,
      this.exercise.reps,
      this.exercise.weight,
      this.data.userID,
      this.data.date,
      this.exercise.comment));
  }
}

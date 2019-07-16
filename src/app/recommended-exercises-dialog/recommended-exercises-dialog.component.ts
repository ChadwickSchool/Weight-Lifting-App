import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../data/data.service';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';

@Component({
  selector: 'wla-recommended-exercises-dialog',
  templateUrl: './recommended-exercises-dialog.component.html',
  styleUrls: ['./recommended-exercises-dialog.component.scss']
})
export class RecommendedExercisesDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecommendedExercisesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private recommendedExerciseService: RecommendedExerciseService  ) {}

  recommendedExercise = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
    coachComment: '',
    rest: '',
    date_posted: new Date()
  };

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.addExercise();
    this.dialogRef.close();
  }

  addExercise() {
    if (this.recommendedExercise.coachComment === '') {
      this.recommendedExercise.coachComment = 'none';
    }
    if (this.recommendedExercise.rest === '') {
      this.recommendedExercise.rest = ' ';
    }
    this.recommendedExerciseService.addExercise(this.recommendedExercise);
  }

}

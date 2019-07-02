import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../data/data.service';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';
import { RecommendedExerciseService } from '../services/exercise.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wla-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private recommendedExerciseService: RecommendedExerciseService,
    private formBuilder: FormBuilder
  ) {}
  recommendedExercise = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
    coachComment: '',
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
    this.recommendedExerciseService.addExercise(this.recommendedExercise);
  }
}

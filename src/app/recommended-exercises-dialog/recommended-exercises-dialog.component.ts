import { Component, Inject, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from '../data/data.service';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Component({
  selector: 'wla-recommended-exercises-dialog',
  templateUrl: './recommended-exercises-dialog.component.html',
  styleUrls: ['./recommended-exercises-dialog.component.scss']
})
export class RecommendedExercisesDialogComponent implements OnInit {
  private recExercises: Array<RecommendedExerciseClass>;
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
    rest: '',
    coachComment: '',
    date_posted: new Date()
  };

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.addExercise();
    this.dialogRef.close();
  }

  addExercise(): void {
    if (this.recommendedExercise.coachComment === '') {
      this.recommendedExercise.coachComment = '';
    }
    if (this.recommendedExercise.rest === '') {
      this.recommendedExercise.rest = '';
    }
    this.recommendedExerciseService.addExercise(this.recommendedExercise);
  }

  async onKeydown(event) {
    console.log('We did it');
    this.recExercises = await this.recommendedExerciseService.getAddedExercises().toPromise();
    console.log('Yeet:' + this.recExercises);
  }

}

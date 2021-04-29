import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciseService } from '../services/exercise.service';
import { DataService } from '../data/data.service';
import ExerciseClass from '../shared/models/exercise';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import RecommendedExerciseClass from '../shared/models/recommended-exercise';

@Component({
  selector: 'wla-edit-recommended-exercise',
  templateUrl: './edit-recommended-exercise.component.html',
  styleUrls: ['./edit-recommended-exercise.component.scss']
})
export class EditRecommendedExerciseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditRecommendedExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private recommendedExerciseService: RecommendedExerciseService
  ) {}

  recommendedExercise = {
    name: this.data ? this.data.name : '',
    sets: this.data ? this.data.sets : '',
    reps: this.data ? this.data.reps : '',
    weight: this.data ? this.data.weight : '',
    rest: this.data ? this.data.rest : '',
    coachComment: this.data ? this.data.coachComment : ''

  };

  ngOnInit() {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm() {
    this.dialogRef.close();
  }

  updateExercise() {
    this.recommendedExerciseService.updateRecommendedExercise(new RecommendedExerciseClass(
      this.data.uid,
      this.recommendedExercise.name,
      this.recommendedExercise.sets,
      this.recommendedExercise.reps,
      this.recommendedExercise.weight,
      this.recommendedExercise.rest,
      this.recommendedExercise.coachComment
    ));
    this.submitForm();
  }
}

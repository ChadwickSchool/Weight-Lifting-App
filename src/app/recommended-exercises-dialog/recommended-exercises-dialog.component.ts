import {
  Component,
  Inject,
  OnInit,
  SystemJsNgModuleLoader
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteModule} from '@angular/material';
import { MaterialModule } from '../shared/material.module';
import { DataService } from '../data/data.service';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { switchMap, tap, take, map, startWith } from 'rxjs/operators';
import { fromEvent, Observable } from 'rxjs';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'wla-recommended-exercises-dialog',
  templateUrl: './recommended-exercises-dialog.component.html',
  styleUrls: ['./recommended-exercises-dialog.component.scss']
})

export class RecommendedExercisesDialogComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  public recExerciseNames: Array<string>;
  constructor(
    public dialogRef: MatDialogRef<RecommendedExercisesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private recommendedExerciseService: RecommendedExerciseService
  ) {
    this.recExerciseNames = [];
  }

  recommendedExercise = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
    rest: '',
    coachComment: '',
    date_posted: new Date()
  };

  ngOnInit(): void {
    this.addExercises();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name) : this.options.slice()),
        tap(result => console.log(result))
      );

  }

  async addExercises() {
    this.recExerciseNames = await this.recommendedExerciseService.getExercisesDatabase();
    console.log(this.recExerciseNames);
  }

  displayFn(name?: string): string | undefined {
    console.log('name ' + name);
    return name ? name : undefined;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    console.log('Filter value' + filterValue);
    console.log(this.recExerciseNames);
    const result = this.recExerciseNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    console.log('result: ' + result);
    return result;
  }

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
    this.recommendedExerciseService.addExerciseLocal(this.recommendedExercise);
  }
}

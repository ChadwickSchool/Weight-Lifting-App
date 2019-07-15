import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { WorkoutElement } from '../workout.table.interface';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { RecommendedExerciseService } from '../services/recommended-exercise.service';
import { ExerciseService } from '../services/exercise.service';
import ExerciseClass from '../shared/models/exercise';
import { Exercise } from '../shared/models/exercise.model';
import { RecommendedExercise } from '../shared/models/recommended-exercise.model';
import { GroupService } from '../services/groups.service';
import { Group } from '../shared/models/group.model';

// export interface RecExerciseData {
//   name: string;
//   sets: string;
//   reps: string;
//   weight: string;
//   coachComment: string;
//   rest: string;
// }

// export interface ExerciseData {
//   name: string;
//   set: number;
//   reps: number;
//   weight: number;
//   userComment: string;
// }

export class ExpansionOverviewExample {
  panelOpenState = false;
}

@Component({
  selector: 'wla-today-workout',
  templateUrl: './today.workout.component.html',
  styleUrls: ['./today.workout.component.scss']
})
export class TodayWorkoutComponent implements OnInit {
  recExercisesDataSource: Array<RecommendedExercise>;
  exerciseDataSource: Exercise;
  groupDataSource: Group;
  setNumber: number;
  constructor(
    private recExerciseService: RecommendedExerciseService,
    private exerciseService: ExerciseService,
    private groupService: GroupService
  ) {
    this.setNumber = 0;
  }
  exercise = {
    name: '',
    reps: '',
    weight: '',
    comment: ''
  };

  group = {
    name: ''
  };
  displayedColumns = ['name', 'sets', 'reps', 'weight', 'rest'];
  displayedExerciseColumns = ['name', 'setNumber', 'reps', 'weight'];

  ngOnInit() {
    this.showExercises();
    this.showGroups();
  }

  showExercises() {
    this.recExerciseService.getAddedExercises().subscribe(recExercises => {
      this.recExercisesDataSource = recExercises;
    });
    this.exerciseService.getAddedExercises().subscribe(exercises => {
      this.exerciseDataSource = exercises;
    });
  }

  showGroups() {
    this.groupService.getAddedGroups().subscribe(groups => {
      this.groupDataSource = groups;
    });
  }

  submitForm() {
    this.addExercise();
  }

  addExercise() {
    if (this.exercise.comment === '') {
      this.exercise.comment = 'none';
    }
    this.setNumber++;
    if (this.setNumber > Number((this.recExercisesDataSource.find(element =>
          element.name === this.exercise.name
        )).sets)) {
      this.setNumber = 1;
    }
    this.exerciseService.addExercise(this.exercise, this.setNumber);
  }
}

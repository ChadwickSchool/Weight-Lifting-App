import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { User } from '../shared/models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../shared/models/exercise.model';
import Utils from '../shared/utils/utils';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'wla-student-workout-history',
  templateUrl: './student-workout-history.component.html',
  styleUrls: ['./student-workout-history.component.scss']
})
export class StudentWorkoutHistoryComponent implements OnInit {
  studentsDataSource: User;
  exercisesDataSource: Array<Exercise>;
  exerciseNamesDataSource: Set<string>;
  exerciseDataSource: Array<Exercise>;
  constructor(
    private studentService: StudentService,
    private exercisesService: ExerciseService
  ) {
    this.exerciseNamesDataSource = new Set();
  }

  name = '';

  exercise = {
    name: '',
    reps: 0,
    weight: 0,
    date: '',
    userComment: ''
  };

  displayedColumns = ['date', 'weight', 'reps', 'comments'];

  ngOnInit() {
    this.showStudents();
    this.showExerciseNames();
  }

  showStudents() {
    this.studentsDataSource = this.studentService.currentStudent;
  }

  showExerciseNames() {
    this.exercisesService.getAllExercisesEver().subscribe(exercise => {
      exercise.forEach(e => {
        console.log('It Worked');
        this.exerciseNamesDataSource.add(e.name);
      });
    });
  }

  showExercise() {
    this.exercisesService
      .getExercise(this.exercise.name)
      .subscribe(exercises => {
        this.exerciseDataSource = exercises;
      });
  }

  updateExerciseTable() {
    this.exercise.reps = 0;
    this.exercise.weight = 0;
    this.exercisesService
      .getExercises(this.exercise.name)
      .subscribe(exercises => {
        this.exerciseDataSource = exercises;
      });
  }
}

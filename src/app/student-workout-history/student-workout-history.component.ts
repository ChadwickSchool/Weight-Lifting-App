import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { User } from '../shared/models/user.model';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../shared/models/exercise.model';

@Component({
  selector: 'wla-student-workout-history',
  templateUrl: './student-workout-history.component.html',
  styleUrls: ['./student-workout-history.component.scss']
})
export class StudentWorkoutHistoryComponent implements OnInit {
  studentsDataSource: User;
  exercisesDataSource: Array<Exercise>;
  constructor(
    private studentService: StudentService,
    private exercisesService: ExerciseService
  ) {}

  ngOnInit() {
    this.showStudents();
    this.showExercises();
  }

  showStudents() {
    this.studentsDataSource = this.studentService.currentStudent;
  }

  showExercises() {
    console.log('It\'s working');
    this.exercisesService.getAllExercisesEver().subscribe(exercises => {
      this.exercisesDataSource = exercises;
    });
    // console.log(this.exercisesDataSource);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'wla-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentsDataSource: Array<User>;
  constructor(private studentService: StudentService, private router: Router) { }

  displayedColumns = ['name'];

  ngOnInit() {
    this.showStudents();
  }

  showStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.studentsDataSource = students;
    });
  }

  displayStudent(student: User) {
    this.studentService.currentStudent = student;
    this.router.navigate(['/student-workout-history']);
  }

}

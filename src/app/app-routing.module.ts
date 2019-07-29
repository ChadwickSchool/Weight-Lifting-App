import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentHomeComponent } from './student-home/student-home.component';
import { TodayWorkoutComponent } from './workout/today.workout.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoginGuard } from './shared/guards/login.guard';
import { LoginComponent } from './login/login.component';
import { StudentEntireWorkoutComponent } from './student-entire-workout/student-entire-workout.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'today-workout-student', component: TodayWorkoutComponent, canActivate: [LoginGuard]},
  {path: 'today-workout-admin', component: CreateWorkoutComponent, canActivate: [LoginGuard]},
  {path: 'admin-home', component: AdminHomeComponent, canActivate: [LoginGuard]},
  {path: 'student-home', component: StudentHomeComponent, canActivate: [LoginGuard]},
  {path: 'student-entire-workout', component: StudentEntireWorkoutComponent, canActivate: [LoginGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

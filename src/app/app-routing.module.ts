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
import { StudentListComponent } from './student-list/student-list.component';
import { StudentWorkoutHistoryComponent } from './student-workout-history/student-workout-history.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      { path: 'today-workout-student', component: TodayWorkoutComponent},
      {
        path: 'today-workout-admin',
        component: CreateWorkoutComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin-home',
        component: AdminHomeComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'student-home',
        component: StudentHomeComponent
      },
      {
        path: 'student-entire-workout',
        component: StudentEntireWorkoutComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'student-list',
        component: StudentListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'student-workout-history',
        component: StudentWorkoutHistoryComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}

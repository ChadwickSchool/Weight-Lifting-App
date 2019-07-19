import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodayWorkoutComponent } from './workout/today.workout.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'today-workout-student', component: TodayWorkoutComponent},
  {path: 'today-workout-admin', component: CreateWorkoutComponent},
  {path: 'admin-home', component: AdminHomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

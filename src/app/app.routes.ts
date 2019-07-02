import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {TodayWorkoutComponent} from './workout/today.workout.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'today-workout-student', component: TodayWorkoutComponent},
  {path: 'today-workout-admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { StudentHomeComponent } from './student-home/student-home.component';
import { TodayWorkoutComponent } from './workout/today.workout.component';
import {DataService} from './data/data.service';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { RecommendedExercisesDialogComponent } from './recommended-exercises-dialog/recommended-exercises-dialog.component';
import {FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { SideNavComponent} from './navigation/side-nav/side-nav.component';
import { RecommendedExerciseService } from './services/recommended-exercise.service';
import { ReactiveFormsModule} from '@angular/forms';
import { ExerciseService} from './services/exercise.service';
import { GroupService } from './services/groups.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentGroupSelectedService } from './services/current-group-selected.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentHomeComponent,
    TodayWorkoutComponent,
    CreateWorkoutComponent,
    RecommendedExercisesDialogComponent,
    NavbarComponent,
    SideNavComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterTestingModule,
    AppRoutingModule
  ],
  entryComponents: [
    RecommendedExercisesDialogComponent
  ],
  providers: [DataService, RecommendedExerciseService, ExerciseService, GroupService, CurrentGroupSelectedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

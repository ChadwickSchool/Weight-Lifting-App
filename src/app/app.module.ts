import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodayWorkoutComponent } from './workout/today.workout.component';
import {AppRouters} from './app.routes';
import {DataService} from './data/data.service';
import { AdminComponent } from './admin/admin.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
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

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TodayWorkoutComponent,
    AdminComponent,
    PostDialogComponent,
    NavbarComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    PostDialogComponent
  ],
  providers: [DataService, RecommendedExerciseService, ExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

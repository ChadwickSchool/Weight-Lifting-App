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


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TodayWorkoutComponent,
    AdminComponent,
    PostDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule
  ],
  entryComponents: [
    PostDialogComponent
  ],  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';
import { TimerComponent } from './timer/timer.component';
import { CountdownModule } from 'ngx-countdown';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { NamePickerComponent } from './name-picker/name-picker.component';
import { TabBlinker } from './shared/tab-blinker';

@NgModule({
  declarations: [
    AppComponent,
    VolumeSliderComponent,
    TimerComponent,
    TimePickerComponent,
    NamePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    CountdownModule,
    MatDialogModule,

  ],
  providers: [TabBlinker],
  bootstrap: [AppComponent]
})
export class AppModule { }

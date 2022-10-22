import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent, CountdownStatus } from 'ngx-countdown';
import { Timer } from '../shared/timer';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { TimePickerData } from '../shared/time-picker-data';
import { NamePickerComponent } from '../name-picker/name-picker.component';
import { TabBlinker } from '../shared/tab-blinker';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @ViewChild('timerCountdown', { static: false }) private timerCountdown: CountdownComponent | undefined;
  @Input() timer = new Timer("Timer",0.5);
  @Output() settingChangedEvent = new EventEmitter()
  timerSound = new Audio();
  countdownConfig:CountdownConfig={stopTime:1, leftTime:1, demand:true};
  running:boolean=false;

  constructor(public dialog: MatDialog, private blinker: TabBlinker) {}

  ngOnInit(): void {
    console.log("on init max time: "+this.timer.maxTime);
    this.timerSound.volume=this.timer.volume;
    this.timerSound.src=this.timer.notificationSound;
    this.timerSound.load();
  }

  ngAfterViewInit():void {
    this.resetTimer();
  }

  selectName() {
    let dialogRef = this.dialog.open(NamePickerComponent, {
      height: '150px',
      width: '300px',
      data: {name:this.timer.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ((result as string).length>0) this.timer.name=result;
      this.settingChangedEvent.emit();
    });
  }

  selectTime() {
    let dialogRef = this.dialog.open(TimePickerComponent, {
      height: '150px',
      width: '300px',
      data: {minutes:this.timer.maxTime}
    });
    dialogRef.afterClosed().subscribe(result => {
      if ((result as number)/60<.001) return;
      this.timer.maxTime=result;
      this.resetTimer();
      this.settingChangedEvent.emit();
    });
  }

  setSound(index:number){
    this.timerSound.load();
    this.settingChangedEvent.emit();
  }

  changeVolume(volume:number) {
    this.timer.volume=volume;
    this.timerSound.volume=volume;
    this.settingChangedEvent.emit();
  }

  playSound() {
    this.timerSound.play();
  }

  timerEvent(event:CountdownEvent) {
    if (event.action!="done") return;
    this.resetTimer();
    this.blinker.blink("Time is up!",5);

    if (this.timer.looping)
    {
      this.timerCountdown?.begin();
      this.running=true;
    }
    this.timerSound.play();
  }

  startOrStop() {
    if (this.running) {
      this.timerCountdown?.pause();
      this.running=false;
      return;
    }
    this.timerCountdown?.begin();
    this.running=true;
  }

  resetTimer() {
    if (this.timerCountdown===undefined) return;
    this.timerCountdown.config.stopTime=this.timer.maxTime*60;
    this.timerCountdown.config.leftTime=this.timerCountdown.config.stopTime;
    this.timerCountdown.restart();
    this.running=false;
  }
}

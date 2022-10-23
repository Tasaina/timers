import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Timer } from './shared/timer';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  timers:Timer[]=[];
  @ViewChildren('timerComponent') timerComponents: QueryList<TimerComponent> | undefined;

  constructor() {

  }

  ngOnInit(): void {
    const saveData=localStorage.getItem("timers");
    if (saveData!=null) {
      const parsedData=<Timer[]>JSON.parse(saveData);
      console.log(parsedData);
      parsedData.forEach(parsedTimer => {
        this.timers.push(new Timer(parsedTimer.name,parsedTimer.volume,parsedTimer.maxTime,parsedTimer.looping))
      });
    }
  }

  newTimer() {
    const newTimer=new Timer("New Timer", 0.5);
    this.timers.push(newTimer);
    this.saveData();
  }

  removeTimer(timerToRemove:Timer) {
    const index = this.timers.indexOf(timerToRemove, 0);
    if (index > -1) {
      this.timers.splice(index, 1);
    }
    this.saveData();
  }

  saveData() {
    const saveData = JSON.stringify(this.timers.map(t=>t.toJson()));
    localStorage.setItem("timers", saveData)
  }

  startAll() {
    this.timerComponents?.forEach(tc=>tc.start());
  }
  pauseAll() {
    this.timerComponents?.forEach(tc=>tc.stop());
  }
  resetAll() {
    this.timerComponents?.forEach(tc=>tc.resetTimer());
  }
  deleteAll() {
    this.timers=[];
  }
}

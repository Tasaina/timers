import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimePickerData } from '../shared/time-picker-data';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent {
  minutes: number = 15;

  constructor(
    public dialogRef: MatDialogRef<TimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) data: TimePickerData,
  ) {
    this.minutes=data.minutes;
  }

  closeClick(): void {
    this.dialogRef.close(this.minutes);
  }
}

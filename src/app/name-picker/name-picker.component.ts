import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NamePickerData } from '../shared/name-picker-data';

@Component({
  selector: 'app-name-picker',
  templateUrl: './name-picker.component.html',
  styleUrls: ['./name-picker.component.scss']
})
export class NamePickerComponent {
  name: string = "New Timer";

  constructor(
    public dialogRef: MatDialogRef<NamePickerComponent>,
    @Inject(MAT_DIALOG_DATA) data: NamePickerData,
  ) {
    this.name=data.name;
  }

  closeClick(): void {
    this.dialogRef.close(this.name);
  }
}

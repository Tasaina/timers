import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-volume-slider',
  templateUrl: './volume-slider.component.html',
  styleUrls: ['./volume-slider.component.scss']
})
export class VolumeSliderComponent implements OnInit {
  value:number=.5;
  @Input() volume:number=.5;
  @Output() volumeChangedEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.value=this.volume;
  }
}

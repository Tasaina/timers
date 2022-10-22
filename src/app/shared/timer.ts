export class Timer {
  name:string
  volume:number
  maxTime:number;
  looping:boolean;
  notificationSound:string="../assets/notification_by_IENBA.wav";

  toJson() {
    return {
      name:this.name,
      volume:this.volume,
      maxTime:this.maxTime,
      looping:this.looping
    }
  }

  constructor (name:string, volume:number, maxTime?:number, looping?:boolean) {
    this.name=name;
    this.volume=volume;
    this.maxTime=maxTime??15;
    this.looping=looping??false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'weathcy',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTime;
  currentYear;
  constructor(title: Title) {
    title.setTitle('Welcome to Weathcy');
  }
  ngOnInit() {
    this.currentTime = setInterval(() => {
      let now: any, hours: any, minutes: any, seconds: any, suffix: any;
      now = new Date();
      hours = now.getHours();
      minutes = now.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      seconds = now.getSeconds();
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      suffix = 'AM';
      if (hours >= 12) {
        suffix = 'PM';
        hours = hours - 12;
      }
      if (hours === 0) {
        hours = 12;
      }
      this.currentTime = hours + ':' + minutes + ':' + seconds + ' ' + suffix;
    }, 1000);
    this.getYear();
  }
  getYear() {
    this.currentYear = new Date().getFullYear();
  }
}

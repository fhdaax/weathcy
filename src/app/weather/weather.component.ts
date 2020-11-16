import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';
import { throwError } from 'rxjs';

import { StorageService } from './storage.service';
import { WeatherService } from './../providers/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city = 'New York';
  spinner: boolean;
  weather: any;
  toCel = true;
  lat: number;
  lng: number;
  typings: any;
  constructor(
    private _reqs: WeatherService,
    public toast: MatSnackBar,
    title: Title,
    private storage: StorageService
  ) {
    title.setTitle('Weather Forecast | Weathcy');
  }

  ngOnInit() {
    this.spinner = true;
    if (this.storage.get('$.city')) {
      this.city = this.storage.get('$.city');
      this.callServer(this.city);
    } else {
      this.storage.set('$.city', this.city);
      this.callServer(this.storage.get('$.city'));
    }
  }

  // onSearchChange(input: string) {
  //   this._reqs.startSearching(input).subscribe(
  //     (data: any) => {
  //       this.typings = data;
  //     },
  //     (error) => throwError(error)
  //   );
  // }

  onSelection(option: string) {
    this.spinner = true;
    this.callServer(option);
  }

  onFindCity(input: string) {
    this.spinner = true;
    this.callServer(input);
  }

  callServer(city: string) {
    this._reqs.getWeather(city).subscribe(
      (data) => {
        if (data) {
          console.log(data);
          this.spinner = false;
          this.weather = data;
          this.lat = this.weather.location.lat;
          this.lng = this.weather.location.lon;
          this.showToast('Data fetched successfully');
          const cityname =
            this.weather.location.name + ', ' + this.weather.location.country;
          this.storage.set('$.city', cityname);
        }
      },
      (error) => {
        this.spinner = false;
        if (error.type === 'error') {
          this.showToast('Connection problem');
        } else if (error.error.message) {
          this.showToast(error.error.message);
        } else {
          this.showToast('Unexpected error');
        }
      }
    );
  }

  showToast(message) {
    this.toast.open(message, 'Ok!', {
      duration: 3000
    });
  }

  tempConverter(temp) {
    if (this.toCel === true) {
      const x = parseFloat(temp);
      const y = (x - 32) * (5 / 9);
      const z = y.toFixed(0);
      return z;
    } else {
      return temp.toFixed(0);
    }
  }

  convertTemp() {
    this.toCel = !this.toCel;
  }
}

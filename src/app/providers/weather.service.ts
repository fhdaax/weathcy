import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { HmacSHA1, enc } from 'crypto-js';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  merged = {};
  merged_arr = Object.keys(this.merged).sort().map((k) => [k + '=' + encodeURIComponent(this.merged[k])]);
  signature_base_str = 'GET&' + encodeURIComponent('https://weather-ydn-yql.media.yahoo.com/forecastrss')
  + '&' + encodeURIComponent(this.merged_arr.join('&'));
  composite_key = encodeURIComponent('') + '&';
  hash = HmacSHA1(this.signature_base_str, this.composite_key);
  signature = this.hash.toString(enc.Base64);
  reqHeader = {
    oauth_consumer_key: '',
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: '',
    oauth_timestamp: (new Date().getTime() / 1000).toFixed(0).toString(),
    oauth_version: '1.0',
    oauth_signature: this.hash.toString(enc.Base64)
  };

  getWeather(cityname: string) {
    console.log(this.reqHeader);
    return this.http.get(
      'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=' + cityname + '&format=json', {
        headers: {
          Authorization: 'OAuth ' + Object.keys(this.reqHeader).map((k) => [k + '="' + this.reqHeader[k] + '"']).join(','),
          'X-Yahoo-App-Id': '',
          'Yahoo-App-Id': ''
        }
      }
    ).pipe(
      map((forecast) => forecast),
      catchError((error) => throwError(error))
    );
  }
}

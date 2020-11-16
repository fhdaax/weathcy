import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { RoutingModule } from './router.module';
import { WeatherService } from './providers/weather.service';
import { StorageService } from './weather/storage.service';

import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DownloadComponent } from './download/download.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HomeComponent,
    WeatherComponent,
    AboutComponent,
    ContactComponent,
    DownloadComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'weathcy' }),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    RoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'string'
    })
  ],
  providers: [WeatherService, StorageService],
  bootstrap: [HomeComponent]
})
export class AppModule {}

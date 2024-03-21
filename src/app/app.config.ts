import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {provideNativeDateAdapter} from "@angular/material/core";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'mqtt.lsplabs.de',
  port: 8883,
  path: '/mqtt',
  clientId: 'Angular'
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(HttpClientModule),importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),provideNativeDateAdapter()],
};

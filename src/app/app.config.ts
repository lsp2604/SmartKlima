import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.178.48',
  port: 4827,
  // path: '/mqtt',
  // username: 'lsp',
  // password: 'SmartKlima',
  // clientId: '333'

};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(HttpClientModule),importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),]
};

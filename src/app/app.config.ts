import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'mqtt.lsplabs.de',
  port: 8883,
  path: '/mqtt',
  // username: 'fhdw-gl-smart-campus@ttn',
  // password: 'NNSXS.5PFB4Z35ZJHAPTNJWKNWQEQBDOEWMTKNNFGKWEY.RPHKKZ5ISAKQZQCGZI4TZB4OFGY7LREIPQASEN7FZ5IYTVKEMSUA',

  // username: 'lsp',
  // password: 'SmartKlima',
  clientId: 'Angular'
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(HttpClientModule),importProvidersFrom(MqttModule.forRoot(MQTT_SERVICE_OPTIONS)),]
};

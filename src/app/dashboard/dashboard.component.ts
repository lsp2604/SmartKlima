import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TempOutComponent } from "./temp-out/temp-out.component";
import { TempReglerComponent } from './temp-regler/temp-regler.component';
import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus/urlaubs-nachtmodus.component';
import { RuhemodusComponent } from './ruhemodus/ruhemodus.component';
import { DownlinkComponent } from "../downlink/downlink.component";
import {WeatherService} from "c:/Users/liqze/OneDrive - LANXESS Deutschland GmbH/Dokumente/SmartKlima/src/app/Service/weather.service";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";



const weatherOptions: NodeListOf<HTMLElement> = document.querySelectorAll('.weather-options__option');
const controls: NodeListOf<HTMLElement> = document.querySelectorAll('.controls__tab');

const power: HTMLElement | null = document.querySelector('.weather__power');
const circleFill: HTMLElement | null = document.querySelector('.weather__circle-fill');
const tempAmount: HTMLElement | null = document.querySelector('.weather__amount');
const tempDegrees: HTMLElement | null = document.querySelector('.weather__degrees');
const tempNull: HTMLElement | null = document.querySelector('.weather__null');

const light: HTMLElement | null = document.getElementById('light');
const shades: HTMLElement | null = document.getElementById('shades');
const audio: HTMLElement | null = document.getElementById('audio');
const coffee: HTMLElement | null = document.getElementById('coffee');
const controlList: Array<HTMLElement | null> = [light, shades, audio, coffee];


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        DatePipe,
        MatGridList,
        MatGridTile,
        MatDivider,
        TempOutComponent,
        TempReglerComponent,
        UrlaubsNachtmodusComponent,
        RuhemodusComponent,
        DownlinkComponent,
    ]
})
export class DashboardComponent {


  constructor(private weatherService: WeatherService) {}

  public weather: any;


  myDate: Date = new Date();


  ngOnInit() {
    this.loadWeather('50.9856', '7.13298');
  }

  loadWeather(lat: string, lon:string) {
    this.weatherService.getWeather(lat, lon).subscribe(
      data => {
        this.weather = data;
        console.log(this.weather);

      },
      err => {
        console.error(err);
      }
    );
  }

}

controls.forEach(control => {
  control.addEventListener('click', (e) => {
    control.classList.toggle('controls__tab--active');

    let stateId: RegExpMatchArray | null = (e.currentTarget as HTMLElement).innerHTML.match('(?:id=\")[a-z]*(?:\")');
    const id: string = stateId ? stateId[0].slice(4, -1) : '';

    controlList.filter(elem => {
      if(elem && elem.id == id) {
        if(!control.classList.contains('controls__tab--active')) {
          elem.textContent = 'OFF';
        } else {
          elem.textContent = 'ON';
        }
      }
    })
  })
})

weatherOptions.forEach(weatherOption => {
  weatherOption.addEventListener('click', () => {
    weatherOptions.forEach(option => {
      option.classList.remove('weather-options__option--active');
    })
    weatherOption.classList.toggle('weather-options__option--active');
  })
})

power?.addEventListener('click', () => {
  circleFill?.classList.toggle('weather__circle-fill--on');
  power.classList.toggle('weather__power--active');

  if(tempNull?.textContent == '--') {
    tempNull.textContent = '';
    tempAmount ? tempAmount.textContent = '24\xB0' : null;
    tempDegrees ? tempDegrees.textContent = 'Celsius' : null;
  } else {
    tempNull ? tempNull.textContent = '--' : null;
    tempAmount ? tempAmount.textContent = '' : null;
    tempDegrees ? tempDegrees.textContent = '' : null;
  }
})

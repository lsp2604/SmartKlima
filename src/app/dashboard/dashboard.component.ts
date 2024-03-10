import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TempOutComponent } from "./temp-out/temp-out.component";
import { TempReglerComponent } from './temp-regler/temp-regler.component';
import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus/urlaubs-nachtmodus.component';
import { RuhemodusComponent } from './ruhemodus/ruhemodus.component';
import { DownlinkComponent } from "../downlink/downlink.component";
import {WeatherService} from "../Service/weather.service";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

declare var $: any;

const controls: NodeListOf<HTMLElement> = document.querySelectorAll('.controls__tab');

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
        DownlinkComponent
    ]
})
export class DashboardComponent implements OnInit {


  constructor(private weatherService: WeatherService) {}

  public weather: any;


  myDate: Date = new Date();


  ngOnInit() {
    this.loadWeather('50.9856', '7.13298');

    $("#slider").roundSlider({
      sliderType: "min-range",
      circleShape: "pie",
      startAngle: 315,
      radius: 120,
      lineCap: "round",
      widows: 32,
      min: 16,
      max: 32,
      svgMode: true,
      handleSize: "+20",
      pathColor: "#e3e4ed",
      borderWidth: 0,
      editableTooltip: false,
      startValue: 0,
      rangeColor: "#97E3FE",
      change: function (args: { value: any; }) {
        console.log(args.value);
      }
    });
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


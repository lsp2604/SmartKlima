import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TempOutComponent } from "./temp-out/temp-out.component";
import { TempReglerComponent } from './temp-regler/temp-regler.component';
import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus/urlaubs-nachtmodus.component';
import { RuhemodusComponent } from './ruhemodus/ruhemodus.component';
import { DownlinkComponent } from "../downlink/downlink.component";
import {WeatherService} from "../Service/weather.service";
import {DatePipe, NgClass} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {DownlinkService} from "../Service/downlink.service";
import {MatIcon} from "@angular/material/icon";
import {ChartService} from "../Service/chart.service";
import {BreakpointObserver} from "@angular/cdk/layout";

declare var $: any;

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
    MatIcon,
    NgClass
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private weatherService: WeatherService, private downlinkService: DownlinkService, private chartService:ChartService,
              public breakpointObserver: BreakpointObserver){}

  public tempIn: any;
  public weather: any;
  public radius: number = 120;
  myDate: Date = new Date();


  toggle = true;
  status = 'On';


  ngOnInit() {

    this.breakpointObserver
      .observe(['(min-width: 1440px)'])
      .subscribe(state => {
        if (state.matches) {
          this.radius = 160;
        } else {
          this.radius = 120;
        }
      })

    this.chartService.fetchLastData().subscribe((data: any) => {
      this.tempIn = data;
    })


    this.loadWeather('50.9856', '7.13298');

    $("#slider").roundSlider({
      sliderType: "min-range",
      circleShape: "pie",
      startAngle: 315,
      radius: this.radius,
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
      change: (args: any) => {
        this.changeTemp(args);
      }
    });
  }


  changeTemp(args: { value: any; }) {
    console.log(args.value);
    // this.downlinkService.sendmsg(args.value);
  }


  loadWeather(lat: string, lon:string) {
    this.weatherService.getWeather(lat, lon).subscribe(
      data => {
        this.weather = data;
      },
      err => {
        console.error(err);
      }
    );
  }



  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'On' : 'Off';
  }}


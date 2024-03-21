import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { DownlinkComponent } from "../downlink/downlink.component";
import {WeatherService} from "../Service/weather.service";
import {DatePipe, NgClass} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {DownlinkService} from "../Service/downlink.service";
import {MatIcon} from "@angular/material/icon";
import {ChartService} from "../Service/chart.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatFormField, MatHint, MatOption, MatSelect} from "@angular/material/select";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";


declare var $: any;

interface Temp {
  value: string;
  viewValue: string;
}

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
    DownlinkComponent,
    MatIcon,
    NgClass,
    MatSelect,
    MatOption,
    MatFormField,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule

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

  toggle2 = false;
  status2 = 'Off';

  temps: Temp[] = [
    {value: '16', viewValue: '16°C'},
    {value: '17', viewValue: '17°C'},
    {value: '18', viewValue: '18°C'},
    {value: '19', viewValue: '19°C'},
    {value: '20', viewValue: '20°C'},
    {value: '21', viewValue: '21°C'},
    {value: '22', viewValue: '22°C'},
    {value: '23', viewValue: '23°C'},
    {value: '24', viewValue: '24°C'},
    {value: '25', viewValue: '25°C'},
    {value: '26', viewValue: '26°C'},
    {value: '27', viewValue: '27°C'},
    {value: '28', viewValue: '28°C'},
    {value: '29', viewValue: '29°C'},
    {value: '30', viewValue: '30°C'},
    {value: '31', viewValue: '31°C'},
    {value: '32', viewValue: '32°C'}
  ];


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
  }

  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
    this.status2 = this.toggle2 ? 'On' : 'Off';
  }
}


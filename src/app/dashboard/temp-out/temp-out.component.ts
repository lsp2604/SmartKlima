import {Component, OnInit} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";
import {WeatherService} from "../../Service/weather.service";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-temp-out',
  standalone: true,
  imports: [
    DatePipe,
    NgOptimizedImage,
    NgIf,
    MatDivider
  ],
  templateUrl: './temp-out.component.html',
  styleUrl: './temp-out.component.scss'
})
export class TempOutComponent implements OnInit{

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

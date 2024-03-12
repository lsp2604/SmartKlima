import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../Service/weather.service'
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})


export class WeatherComponent implements OnInit {
  public weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather('50.9856', '7.13298'); // Beispielstadt
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

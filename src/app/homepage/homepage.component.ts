import { Component } from '@angular/core';
import {WeatherComponent} from "../cards/weather/weather.component";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    WeatherComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

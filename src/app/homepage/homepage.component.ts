import { Component } from '@angular/core';
import {WeatherComponent} from "../cards/weather/weather.component";
import {DownlinkComponent} from "../downlink/downlink.component";


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    WeatherComponent,
    DownlinkComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}

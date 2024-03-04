import {Component, HostListener} from '@angular/core';
import {WeatherComponent} from "../cards/weather/weather.component";
import {DownlinkComponent} from "../downlink/downlink.component";
import { NgxGaugeModule } from 'ngx-gauge';
import {FormsModule} from "@angular/forms";
import {Meta, Title} from "@angular/platform-browser";
import {FeatureCard3} from "../cards/feature-card3/feature-card3.component";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    WeatherComponent,
    DownlinkComponent,
    NgxGaugeModule,
    FormsModule,
    FeatureCard3,

  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}




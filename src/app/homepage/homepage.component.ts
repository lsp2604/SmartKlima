import {Component} from '@angular/core';
import {WeatherComponent} from "../cards/weather/weather.component";
import {DownlinkComponent} from "../downlink/downlink.component";
import { NgxGaugeModule } from 'ngx-gauge';
import {FormsModule} from "@angular/forms";
import {FeatureCard3} from "../cards/feature-card3/feature-card3.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {NgOptimizedImage} from "@angular/common";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    WeatherComponent,
    DownlinkComponent,
    NgxGaugeModule,
    FormsModule,
    FeatureCard3,
    MatButtonToggle,
    NgOptimizedImage,

  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  scrollToElement($element: HTMLSpanElement) {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}




import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {TemperatureSliderComponent} from "./temperature-slider/temperature-slider.component";
import {DownlinkComponent} from "../downlink/downlink.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        MatGridList,
        MatGridTile,
        TemperatureSliderComponent,
        DownlinkComponent
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}


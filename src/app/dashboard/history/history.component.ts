import { Component } from '@angular/core';
import {LineChartModule} from "@swimlane/ngx-charts";
import {multi} from "./data";

@Component({
  selector: 'app-history',
  standalone: true,
    imports: [
        LineChartModule
    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  view: [number, number] = [1000, 600];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  data = multi;
}

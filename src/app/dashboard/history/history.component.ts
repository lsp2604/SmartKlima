import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from "../../Service/chart.service";

@Component({
  selector: 'app-history',
  standalone: true,
    imports: [


    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})


export class HistoryComponent implements OnInit{


  title = 'ng-chart';
  chart: any = [];

  constructor(@Optional() private chartservice:ChartService) {}



  ngOnInit() {
    this.chartservice.fetchData().subscribe(res => {
      console.log(res)
    })
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}


import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from "../Service/chart.service";
import * as mdata from '../../assets/data.json';
import {toArray} from "rxjs";


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit {
  chart: any = [];

  mockdata = mdata;

  constructor(@Optional() private chartservice: ChartService) {
  }


  ngOnInit() {
    console.log('HistoryComponent initialized');
    console.log(this.chartservice.fetchData());
    console.log('-----------------------------');

    // Initialisieren Sie das Chart-Objekt
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [], // Initial leere Labels
        datasets: [] // Initial leere Datensätze
      },
      // Weitere Konfigurationen...
    });

    // Laden der Daten für die Sensoren
    this.loadDataForSensors();
  }


  loadDataForSensors() {
    this.chartservice.fetchData().pipe(
      toArray() // This collects all emitted items into an array
    ).subscribe((dataArray: any[]) => {
      // Now 'dataArray' is guaranteed to be an array
      this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      this.chart.data.datasets = [{
        label: 'Temperatur',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'red',
        fill: false
      }];
      this.chart.update();
    });
  }


  formatTime(dateInput: string): string {
    const date = new Date(dateInput);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}





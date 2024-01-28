import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from "../../Service/chart.service";
import * as mdata from '../../assets/data.json';


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
    this.loadDataForSensors('TLM0100', 'TLM0101');
  }


  loadDataForSensors(sensorId1: string, sensorId2: string) {
    // Hilfsfunktion zum Filtern der Daten für einen bestimmten Sensor
    const filterDataForSensor = (sensorId: string) => {
      return this.mockdata.results[0].series[0].values.filter((data: any) => data[2] === sensorId);
    }

    // Daten für jeden Sensor filtern
    const dataSensor1 = filterDataForSensor(sensorId1);
    const dataSensor2 = filterDataForSensor(sensorId2);

    // Hilfsfunktion zum Umformatieren der Zeitstempel
    const formatTime = (timeString: string) => {
      const date = new Date(timeString);
      return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    };

    // Zeitlabels formatieren
    const timeLabels = dataSensor1.map((data: any) => formatTime(data[0]));

    // Setzen der Labels und Daten für das Chart
    if (this.chart && this.chart.data) {
      this.chart.data.labels = timeLabels;
      this.chart.data.datasets = [
        {
          data: dataSensor1.map((data: any) => data[1]),
          borderColor: '#3e95cd',
          label: `Sensor ${sensorId1}`,
          backgroundColor: 'rgba(93, 175, 89, 0.1)',
          borderWidth: 3,
        },
        {
          data: dataSensor2.map((data: any) => data[1]),
          borderColor: '#FF0000',
          label: `Sensor ${sensorId2}`,
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          borderWidth: 3,
        }
      ];
      this.chart.update();
    }
  }
}





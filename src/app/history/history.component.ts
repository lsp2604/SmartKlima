import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import {ChartService} from "../Service/chart.service";
import {toArray} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    MatDatepickerToggle,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatDatepicker,
    MatInput,
    MatLabel,
    MatToolbar,
    MatIcon,
    MatMenuTrigger,
    MatIconButton,
    DatePickerComponent,
    FormsModule,
    MatSelect,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})


export class HistoryComponent implements OnInit {
  minScaleValue : number | undefined;
  maxScaleValue : number | undefined;

  selected = '-24h';

  public chart: any = [];
  constructor(@Optional() private chartservice: ChartService, public dialog:MatDialog) {}
  ngOnInit() {
    this.createChart()
    // Laden der Daten für die Sensoren
    const start = "-24h"
    const end = "now()"
    const custom = false;
    this.loadDataForSensors(start, end, custom);
    this.loadWeatherDataForSensors(start, end, custom);
  }

  createChart()
  {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [], // Initial leere Labels
        datasets: [],// Initial leere Datensätze
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'rgba(217, 217, 217)',
              font: {
                family: 'Verdana',
                size: 12,
                weight: 'bold',

              }
            }
          }
        },
        scales: {
          x: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            },
            ticks:{
              color: 'rgba(217, 217, 217)',
              font: {
                family: 'Verdana',
                size: 12,
                weight: 'bold'
              }
            }
          },
          y: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            },
            ticks:{
              color: 'rgba(217, 217, 217)',
              font: {
                family: 'Verdana',
                size: 12,
                weight: 'bold'
              }
            }
          }
      }
      }
    });
  }

  loadDataForSensors(start:string, end:string, custom:boolean) {
    this.chartservice.fetchData(start, end, custom).pipe(
      toArray() // This collects all emitted items into an array
    ).subscribe((dataArray: any[]) => {
      // Now 'dataArray' is guaranteed to be an array
      // this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));

      dataArray = this.removeDuplicatesFromArray(dataArray);

      if(custom)
      {
          this.chart.data.labels = dataArray.map((d: any) => this.formatTimeToDate(d._time));
      }
      else{
        this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      }

      const sensorDataset = {
        label: 'Indoor Temperature',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgb(255, 0, 0)',
        fill: false,
      };

      this.chart.data.datasets.push(sensorDataset);

      let minDataValue = Number.POSITIVE_INFINITY;
      let maxDataValue = Number.NEGATIVE_INFINITY;
      dataArray.forEach((d: any) => {
        const value = d._value;
        if (value < minDataValue) {
          minDataValue = value;
        }
        if (value > maxDataValue) {
          maxDataValue = value;
        }
      });

      if(this.minScaleValue == null || this.minScaleValue! > minDataValue )
      {
        this.minScaleValue = minDataValue;
      }
      if(this.maxScaleValue == null || this.maxScaleValue! < maxDataValue)
      {
        this.maxScaleValue = maxDataValue;
      }
      this.chart.options.scales.y.min = Math.floor(this.minScaleValue!) - 1;
      this.chart.options.scales.y.max = Math.ceil(this.maxScaleValue!) + 1;
      this.chart.update();
    });
  }

  loadWeatherDataForSensors(start:string, end:string, custom:boolean) {
    this.chartservice.fetchWeatherData(start, end, custom).pipe(
      toArray() // This collects all emitted items into an array
    ).subscribe((dataArray: any[]) => {
      // Now 'dataArray' is guaranteed to be an array
      // this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));

      dataArray = this.removeDuplicatesFromArray(dataArray);

      if(custom)
      {
          this.chart.data.labels = dataArray.map((d: any) => this.formatTimeToDate(d._time));
      }
      else
      {
        this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      }

      const weatherDataset = {
        label: 'Outdoor Temperature',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'rgb(0, 102, 255)',
        backgroundColor: 'rgb(0, 102, 255)',
        fill: false,
      };

      this.chart.data.datasets.push(weatherDataset);

      let minWeatherDataValue = Number.POSITIVE_INFINITY;
      let maxWeatherDataValue = Number.NEGATIVE_INFINITY;
      dataArray.forEach((d: any) => {
        const value = d._value;
        if (value < minWeatherDataValue) {
          minWeatherDataValue = value;
        }
        if (value > maxWeatherDataValue) {
          maxWeatherDataValue = value;
        }
      });
      if(this.minScaleValue == null || this.minScaleValue! > minWeatherDataValue )
      {
        this.minScaleValue = minWeatherDataValue;
      }
      if(this.maxScaleValue == null || this.maxScaleValue! < maxWeatherDataValue)
      {
        this.maxScaleValue = maxWeatherDataValue;
      }
      this.chart.options.scales.y.min = Math.floor(this.minScaleValue!) - 1;
      this.chart.options.scales.y.max = Math.ceil(this.maxScaleValue!) + 1;
      this.chart.update();
    });
  }

  removeDuplicatesFromArray(dataArray: any[]) {
    let arrayCleaned: any[] = [];
    let seen: { [key: string]: boolean } = {}; // Objekt zum Verfolgen bereits gesehener Zeitpunkte

    for (let item of dataArray) {
        let timestamp = item._time; // Annahme: timestamp ist das Feld, das den Zeitpunkt enthält

        // Wenn der Zeitpunkt noch nicht gesehen wurde, füge ihn zum bereinigten Array hinzu und markiere ihn als gesehen
        if (!seen.hasOwnProperty(timestamp)) {
            arrayCleaned.push(item);
            seen[timestamp] = true;
        }
    }

    arrayCleaned.sort((a, b) => {
      return new Date(a._time).getTime() - new Date(b._time).getTime();
    });
    return arrayCleaned;
  }




  formatTime(dateInput: string): string {
    const date = new Date(dateInput);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  formatTimeToDate(dateInput: string): string {
    const date = new Date(dateInput);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate werden von 0 bis 11 gezählt, deshalb +1
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }


  onSelectionChange(value:string) {
    this.chart.destroy('canvas');
    this.createChart();
    if (value === 'custom') {
      this.openDatePicker();
    }
    else {
      const start = value;
      const end = "now()"
      const custom = false;
      this.loadDataForSensors(start, end, custom);
      this.loadWeatherDataForSensors(start, end, custom);
    }
  }

  openDatePicker() {
    const dialogConfig = new MatDialogConfig();
    const start = new Date()
    const end = new Date()
    const custom = true;
    dialogConfig.data = {start, end};

    dialogConfig.height = '90%';
    dialogConfig.width = '55%';
    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.loadDataForSensors(result.start, result.end, custom);
      this.loadWeatherDataForSensors(result.start, result.end, custom);
    });
  }
}


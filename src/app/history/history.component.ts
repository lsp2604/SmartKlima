import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import {ChartService} from "../Service/chart.service";
import {min, toArray} from "rxjs";
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
import { forkJoin } from 'rxjs';
import { withInterceptors } from '@angular/common/http';


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

  dataWeather: any;

  public chart: any = [];
  constructor(@Optional() private chartservice: ChartService, public dialog:MatDialog) {}
  ngOnInit() {

    // Initialisieren Sie das Chart-Objekt
    this.createChart;
 
    // Laden der Daten für die Sensoren
    const start = "-24h"
    const end = "now()"
    const custom = false;
    this.loadDataForSensors(start, end, custom);
    this.loadWeatherDataForSensors(start, end, custom);
  }

  createChart () {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [], // Initial leere Labels
        datasets: [],// Initial leere Datensätze
      },
      options: {
        plugins: {
        },
        backgroundColor: 'purple',
        scales: {
          x: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            }, 
            ticks:{
              color: 'rgba(154, 154, 154, 10)'
            }
          },
          y: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            },
            ticks:{
              color: 'rgba(154, 154, 154, 10)'
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
      if(custom)
      {
          this.chart.data.labels = dataArray.map((d: any) => this.formatTimeToDate(d._time));
      }
      else{
        this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      }
      
      const sensorDataset = {
        label: 'Temperatur',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'rgb(187, 134, 252)',
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
        console.log("loaded min data");
        console.log(this.minScaleValue);
      }
      if(this.maxScaleValue == null || this.maxScaleValue! < maxDataValue)
      {
        this.maxScaleValue = maxDataValue;
        console.log("loaded max data");
        console.log(this.maxScaleValue);
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
      if(custom)
      {
          this.chart.data.labels = dataArray.map((d: any) => this.formatTimeToDate(d._time));
      }
      else{
        this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      }

      const dataWeather = {
        label: 'Outdoor Temperature',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'rgb(187, 134, 252)',
        fill: false,
      };

      console.log("Weather data")
      console.log(this.dataWeather)
      this.chart.data.datasets.push(dataWeather);


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
        console.log("loaded weather min data");
        console.log(this.minScaleValue);
      }
      if(this.maxScaleValue == null || this.maxScaleValue! < maxWeatherDataValue)
      {
        this.maxScaleValue = maxWeatherDataValue;
        console.log("loaded weather max data");
        console.log(this.maxScaleValue);
      }
      this.chart.options.scales.y.min = Math.floor(this.minScaleValue!) - 1;
      this.chart.options.scales.y.max = Math.ceil(this.maxScaleValue!) + 1;
      this.chart.update();
    });
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
    this.chart.destroy();
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

    dialogConfig.height = '7vw';
    dialogConfig.width = '75vh';
    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.loadDataForSensors(result.start, result.end, custom);
      this.loadWeatherDataForSensors(result.start, result.end, custom);
    });

  }

}

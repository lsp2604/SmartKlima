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





  chart: any = [];
  constructor(@Optional() private chartservice: ChartService, public dialog:MatDialog) {}
  ngOnInit() {

    // Initialisieren Sie das Chart-Objekt
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [], // Initial leere Labels
        datasets: [] // Initial leere Datensätze
      },
      options: {
        plugins: {
        },
        backgroundColor: 'red',
        elements: {
          
        },
        scales: {
          x: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            }
          },
          y: {
            grid:{
              color: 'rgba(154, 154, 154, 10)'
            }
          }
      }
      }
    });
    // Laden der Daten für die Sensoren
    const start = "-24h"
    const end = "now()"
    this.loadDataForSensors(start, end);
  }
  loadDataForSensors(start:string, end:string) {
    this.chartservice.fetchData(start, end).pipe(
      toArray() // This collects all emitted items into an array
    ).subscribe((dataArray: any[]) => {
      // Now 'dataArray' is guaranteed to be an array
      this.chart.data.labels = dataArray.map((d: any) => this.formatTime(d._time));
      this.chart.data.datasets = [{
        label: 'Temperatur',
        data: dataArray.map((d: any) => d._value),
        borderColor: 'red',
        fill: false,
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

  onSelectionChange(value:string) {
    if (value === 'custom') {
      this.openDatePicker();
    }
    else {
      const start = value;
      const end = "now()"
      this.loadDataForSensors(start, end);
    }
  }

  openDatePicker() {
    const dialogConfig = new MatDialogConfig();
    const start = new Date()
    const end = new Date()
    dialogConfig.data = {start, end};

    dialogConfig.height = '50vw';
    dialogConfig.width = '75vh';
    const dialogRef = this.dialog.open(DatePickerComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      this.loadDataForSensors(result.start, result.end);
    });

  }

}

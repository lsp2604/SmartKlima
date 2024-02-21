import {Component, OnInit, Optional} from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from "../Service/chart.service";
import {toArray} from "rxjs";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {MatDialog} from "@angular/material/dialog";
import {MatDialogRef} from "@angular/material/dialog";



interface timeRanges {
  value: string;
  viewValue: string;
}

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
    MatSelect
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})


export class HistoryComponent implements OnInit {
  timeranges: timeRanges[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];



  chart: any = [];
  selectedOption: any;
  constructor(@Optional() private chartservice: ChartService, public dialog:MatDialog) {}
  ngOnInit() {
    // Initialisieren Sie das Chart-Objekt
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [], // Initial leere Labels
        datasets: [] // Initial leere Datensätze
      },
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

  onSelectionChange(event: MatSelectChange) {
    if (event.value === 'custom') {
      this.openDatePicker();
    }
  }

  openDatePicker() {
    const dialogRef = this.dialog.open(DatePickerComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      // Here, you can handle the result, e.g., setting the date range for your application
    });

  }

}

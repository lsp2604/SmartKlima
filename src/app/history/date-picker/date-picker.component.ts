import {Component, Inject, Optional} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatDatepickerModule
} from "@angular/material/datepicker";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";
import {JsonPipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-date-picker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialogRef<DatePickerComponent>,@Optional() private datePipe: DatePipe) {
    // data.start = new Date();
    // data.end = new Date();
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  // Helper method to format dates
  stringify () {
    const start = JSON.stringify(this.range.value.start);
    const end = JSON.stringify(this.range.value.end);

    start.replace(/"/g, '');
    end.replace(/"/g, '');

    const res_start = JSON.parse(start);
    const res_end = JSON.parse(end);

    return {start: res_start, end: res_end};
  }


  save() {
    this.data = this.stringify();


    this.dialog.close(this.data);
  }

}

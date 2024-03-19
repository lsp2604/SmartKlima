import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  DateRange,
  DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule
} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";
import {JsonPipe} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-date-picker',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    }
  ],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

  constructor(private dialog: MatDialogRef<DatePickerComponent>) {}
  selectedDateRange: DateRange<Date | undefined> | undefined;

  _onSelectedChange(date: Date | undefined | null): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date! > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  formatDate(date: Date | undefined | null) {
    if (date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind 0-basiert
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0') + '.' + date.getMilliseconds().toString().padStart(3, '0');
      return `${year}-${month}-${day}T${hours}Z`;
    } else {
      return '';
    }
  }

  formatSelectedDateRange(selectedDateRange: DateRange<Date | undefined> | undefined) {
    if (selectedDateRange) {
      const formattedStart = this.formatDate(selectedDateRange.start);
      const formattedEnd = this.formatDate(selectedDateRange.end);
      return new DateRange(formattedStart, formattedEnd);
    } else {
      return new DateRange(null, null);
    }
  }




  save() {
    this.dialog.close(this.formatSelectedDateRange(this.selectedDateRange));
  }

}

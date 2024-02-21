import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-temp-in',
  standalone: true,
    imports: [
        MatIcon,
        DatePipe
    ],
  templateUrl: './temp-in.component.html',
  styleUrl: './temp-in.component.scss'
})
export class TempInComponent {

  myDate: Date = new Date();


}

import { Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput} from "@angular/material/input";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";

@Component({
  selector: 'app-temperature-slider',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatCheckbox,
    MatInput,
    MatSlider,
    MatSliderThumb,
    MatLabel
  ],
  templateUrl: './temperature-slider.component.html',
  styleUrl: './temperature-slider.component.css'
})
export class TemperatureSliderComponent {

  disabled = false;
  max = 30;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

}

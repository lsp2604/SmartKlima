import { Component } from '@angular/core';
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlider } from '@angular/material/slider';
import { MatSliderChange } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-temperature-slider',
  standalone: true,
  imports: [
    FormsModule,
    MatSlider,
    MatCardModule,
  ],
  templateUrl: './temperature-slider.component.html',
  styleUrl: './temperature-slider.component.scss'
})

export class TemperatureSliderComponent {
  simpleSliderValue = 20;
  outsideTemperature = 15;
  insideTemperature = 22;

  onSimpleSliderChange(event: MatSliderChange): void {
    this.simpleSliderValue = event.value;
  }
}

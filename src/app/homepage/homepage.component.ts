import {Component, HostListener} from '@angular/core';
import {WeatherComponent} from "../cards/weather/weather.component";
import {DownlinkComponent} from "../downlink/downlink.component";
import { NgxGaugeModule } from 'ngx-gauge';
import {FormsModule} from "@angular/forms";



@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    WeatherComponent,
    DownlinkComponent,
    NgxGaugeModule,
    FormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  temperature = 0;
  fillPath = '';
  private isDragging = false;
  private centerX = 50; // Assuming the center of the SVG circle is at (50,50)
  private centerY = 50;
  private radius = 40; // The radius of the circular path

  constructor() {
    this.updateFillPath(0); // Initialize with 0 degrees
  }

  @HostListener('document:mouseup', ['$event'])
  stopDrag(event: MouseEvent): void {
    this.isDragging = false;
  }

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.calculateTemperature(event);
  }

  drag(event: MouseEvent): void {
    if (this.isDragging) {
      this.calculateTemperature(event);
    }
  }

  private calculateTemperature(event: MouseEvent): void {
    const rect = (event.target as SVGElement).getBoundingClientRect();
    const x = event.clientX - rect.left - this.centerX;
    const y = event.clientY - rect.top - this.centerY;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 360) % 360; // Normalize angle to 0-360

    const temperature = Math.round((angle / 360) * 100); // Map angle to temperature
    this.temperature = temperature;
    this.updateFillPath(angle);
  }

  private updateFillPath(angle: number): void {
    const largeArcFlag = angle <= 180 ? "0" : "1";
    const endPointX = 50 + this.radius * Math.cos((angle-90) * Math.PI / 180);
    const endPointY = 50 + this.radius * Math.sin((angle-90) * Math.PI / 180);

    this.fillPath = `M 50,10 A 40,40 0 ${largeArcFlag},1 ${endPointX},${endPointY}`;
  }

}

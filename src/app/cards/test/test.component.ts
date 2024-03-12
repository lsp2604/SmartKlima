import {AfterViewInit, Component, OnInit} from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit{

  ngOnInit() {
    $("#slider").roundSlider({
      sliderType: "min-range",
      circleShape: "pie",
      startAngle: 315,
      radius: 120,
      lineCap: "round",
      widows: 32,
      min: 16,
      max: 32,
      svgMode: true,
      handleSize: "+8",
      pathColor: "#e3e4ed",
      borderWidth: 0,
      editableTooltip: false,
      startValue: 0,
      rangeColor: "#97E3FE",
      change: function (args: { value: any; }) {
        console.log(args.value);
      }
    });
  }

}

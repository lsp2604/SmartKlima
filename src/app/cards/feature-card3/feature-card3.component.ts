import { Component, Input } from '@angular/core'
import {NgClass} from "@angular/common";

@Component({
  selector: 'feature-card3',
  templateUrl: 'feature-card3.component.html',
  styleUrls: ['feature-card3.component.css'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class FeatureCard3 {
  @Input()
  action: string = 'SEE MORE'
  @Input()
  rootClassName: string = ''
  @Input()
  title: string = 'Lorem ipsum'
  @Input()
  description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing.'
  constructor() {}
}

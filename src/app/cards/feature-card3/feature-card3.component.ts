import { Component, Input } from '@angular/core'
import {NgClass} from "@angular/common";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'feature-card3',
  templateUrl: 'feature-card3.component.html',
  styleUrls: ['feature-card3.component.css'],
  imports: [
    NgClass,
    MatIcon,
    MatIconModule,
    MatButtonToggle,
    RouterLink
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
  @Input()
  icon: string = "dashboard"
  @Input()
  redirectUrl: string = '/dashboard'
  constructor(public router:Router ) {}


}

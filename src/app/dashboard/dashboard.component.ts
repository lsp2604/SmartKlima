import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}


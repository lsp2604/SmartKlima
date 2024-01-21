import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, MatIcon, MatIconButton, MatToolbar, MatButtonToggle, RouterLink, MatButtonModule, MatIconModule, MatSidenavContainer, MatSidenav, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: []
})
export class AppComponent {
  title = 'SmartKlima';
  showFiller = false;


  constructor(public router:Router) {
  }


}

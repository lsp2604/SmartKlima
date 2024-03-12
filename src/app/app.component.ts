import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {NgClass, NgIf} from "@angular/common";
import {MatListItem, MatNavList} from "@angular/material/list";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, MatIcon, MatIconButton, MatToolbar, MatButtonToggle, RouterLink, MatButtonModule, MatIconModule, MatSidenavContainer, MatSidenav, NgIf, MatNavList, MatListItem, MatSidenavModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: []
})
export class AppComponent {
  title = 'SmartKlima';

  constructor(public router:Router ) {}

}

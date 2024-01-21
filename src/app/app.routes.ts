import { Routes } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component";
import {HomepageComponent} from "./homepage/homepage.component";

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: 'dashboard', component: DashboardComponent },
];

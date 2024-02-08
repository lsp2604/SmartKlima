import { Routes } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {HistoryComponent} from "./dashboard/history/history.component";

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'history', component: HistoryComponent },
];

import { Routes } from '@angular/router';
import { DashboardComponent} from "./dashboard/dashboard.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {HistoryComponent} from "./history/history.component";
import {TestComponent} from "./cards/test/test.component";

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'test', component: TestComponent },
];

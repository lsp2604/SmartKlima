import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TempInComponent } from "./temp-in/temp-in.component";
import { TempOutComponent } from "./temp-out/temp-out.component";
import { TempReglerComponent } from './temp-regler/temp-regler.component';
import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus/urlaubs-nachtmodus.component';
import { RuhemodusComponent } from './ruhemodus/ruhemodus.component';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        MatGridList,
        MatGridTile,
        TempInComponent,
        TempOutComponent,
        TempReglerComponent,
        UrlaubsNachtmodusComponent,
        RuhemodusComponent
    ]
})
export class DashboardComponent {
}


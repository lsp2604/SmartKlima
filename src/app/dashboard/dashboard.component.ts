import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import { TempOutComponent } from "./temp-out/temp-out.component";
import { TempReglerComponent } from './temp-regler/temp-regler.component';
import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus/urlaubs-nachtmodus.component';
import { RuhemodusComponent } from './ruhemodus/ruhemodus.component';
import { DownlinkComponent } from "../downlink/downlink.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        MatGridList,
        MatGridTile,
        TempOutComponent,
        TempReglerComponent,
        UrlaubsNachtmodusComponent,
        RuhemodusComponent,
        DownlinkComponent,
    ]
})
export class DashboardComponent {
}


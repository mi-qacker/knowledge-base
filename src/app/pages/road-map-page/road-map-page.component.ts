import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute} from '@angular/router';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';
import {RoadMapNodeHttpService} from 'app/services/http/road-map-node-http/road-map-node-http.service';
import {RoadMapComponent} from 'app/widgets/road-map/road-map.component';
import {RoadMapNodeComponent} from 'app/widgets/road-map-node/road-map-node.component';
import {RoadMapTreeComponent} from 'app/widgets/road-map-tree/road-map-tree.component';
import {combineLatest, first, Observable, take} from 'rxjs';

@Component({
  selector: 'app-road-map-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RoadMapComponent,
    RoadMapTreeComponent,
    RoadMapNodeComponent,
  ],
  templateUrl: './road-map-page.component.html',
  styleUrls: ['./road-map-page.component.scss'],
})
export default class RoadMapPageComponent {
  roadMapNodes$!: Observable<IRoadMapNode[]>;
  roadMap?: IRoadMap;
  isOwnerRoadMap?: boolean;

  constructor(
    private route: ActivatedRoute,
    private roadMapHttpService: RoadMapHttpService,
    private roadMapNodeHttpService: RoadMapNodeHttpService,
    private loggedUserService: LoggedUserService
  ) {
    this.route.params.subscribe(({id}) => {
      const roadMapId: string = id;

      this.roadMapNodes$ = this.roadMapNodeHttpService.getRoadMapNodes({
        roadMap: roadMapId,
      });

      combineLatest([
        this.roadMapHttpService.getRoadMapById(roadMapId),
        this.loggedUserService.user$,
      ])
        .pipe(first())
        .subscribe(([roadMap, user]) => {
          this.roadMap = roadMap;
          this.isOwnerRoadMap = roadMap.author._id === user?._id;
        });
    });
  }
}

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
import {combineLatest} from 'rxjs';

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
  roadMap?: IRoadMap;
  isOwnerRoadMap?: boolean;
  roadMapNodes?: IRoadMapNode[];
  selectedRoadMapNode?: IRoadMapNode;

  constructor(
    private route: ActivatedRoute,
    private roadMapHttpService: RoadMapHttpService,
    private roadMapNodeHttpService: RoadMapNodeHttpService,
    private loggedUserService: LoggedUserService
  ) {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.loggedUserService.user$,
    ]).subscribe(([params, queryParams, user]) => {
      const roadMapId = params.get('id');
      const roadMapNodeId = queryParams.get('node');
      if (roadMapId) {
        this.roadMapHttpService.getRoadMapById(roadMapId).subscribe(roadMap => {
          this.roadMap = roadMap;
          this.isOwnerRoadMap = roadMap.author._id === user?._id;
        });

        this.roadMapNodeHttpService
          .getRoadMapNodes({roadMap: roadMapId})
          .subscribe(roadMapNodes => {
            this.roadMapNodes = roadMapNodes;
            if (roadMapNodeId)
              this.selectedRoadMapNode = roadMapNodes.find(
                node => node.id === roadMapNodeId
              );
          });
      }
    });
  }
}

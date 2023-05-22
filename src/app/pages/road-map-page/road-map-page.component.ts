import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute} from '@angular/router';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';
import {RoadMapStoreModule} from 'app/services/road-map-store/road-map-store.module';
import {RoadMapStoreService} from 'app/services/road-map-store/road-map-store.service';
import {RoadMapComponent} from 'app/widgets/road-map/road-map.component';
import {RoadMapNodeComponent} from 'app/widgets/road-map-node/road-map-node.component';
import {RoadMapTreeComponent} from 'app/widgets/road-map-tree/road-map-tree.component';
import {combineLatest, Observable, of} from 'rxjs';

@Component({
  selector: 'app-road-map-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RoadMapComponent,
    RoadMapTreeComponent,
    RoadMapNodeComponent,
    RoadMapStoreModule,
  ],
  templateUrl: './road-map-page.component.html',
  styleUrls: ['./road-map-page.component.scss'],
})
export default class RoadMapPageComponent {
  roadMap$ = this.roadMapStoreService.roadMap$;
  roadMapNodes$ = this.roadMapStoreService.roadMapNodes$;
  isOwnerRoadMap$ = this.roadMapStoreService.isOwnerRoadMap$;
  selectedRoadMapNode$: Observable<IRoadMapNode | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private roadMapStoreService: RoadMapStoreService
  ) {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      ([params, queryParams]) => {
        const roadMapId = params.get('id');
        const roadMapNodeId = queryParams.get('node');
        if (roadMapId) {
          this.roadMapStoreService.loadRoadMap(roadMapId);
        }
        if (roadMapNodeId) {
          this.selectedRoadMapNode$ =
            this.roadMapStoreService.selectNode(roadMapNodeId);
        }
      }
    );
  }
}

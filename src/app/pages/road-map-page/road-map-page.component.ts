import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';
import {RoadMapComponent} from 'app/widgets/road-map/road-map.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-road-map-page',
  standalone: true,
  imports: [CommonModule, RoadMapComponent],
  templateUrl: './road-map-page.component.html',
  styleUrls: ['./road-map-page.component.scss'],
})
export class RoadMapPageComponent {
  roadMap$?: Observable<IRoadMap>;

  constructor(
    private route: ActivatedRoute,
    private roadMapHttpService: RoadMapHttpService
  ) {
    this.route.params.subscribe(({id}) => {
      const roadMapId: string = id;
      this.roadMap$ = this.roadMapHttpService.getRoadMapById(roadMapId);
    });
  }
}

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-road-maps',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './road-maps.component.html',
  styleUrls: ['./road-maps.component.scss'],
})
export default class RoadMapsComponent {
  roadMaps$: Observable<IRoadMap[]>;

  constructor(private roadMapHttpService: RoadMapHttpService) {
    this.roadMaps$ = this.roadMapHttpService.getRoadMaps();
  }
}

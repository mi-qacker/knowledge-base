import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';

@Component({
  selector: 'app-road-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
})
export class RoadMapComponent {
  @Input({required: true}) public roadMap: IRoadMap | null = null;
}

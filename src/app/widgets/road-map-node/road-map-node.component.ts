import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {IRoadMapNode} from 'app/services/http/road-map-node-http/road-map-node';

@Component({
  selector: 'app-road-map-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './road-map-node.component.html',
  styleUrls: ['./road-map-node.component.scss'],
})
export class RoadMapNodeComponent {
  @Input({required: true}) roadMapNode?: IRoadMapNode;
  @Input({required: true}) public isOwnerRoadMap?: boolean = false;
}

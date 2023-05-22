import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RoadMapStoreService} from './road-map-store.service';

@NgModule({
  providers: [RoadMapStoreService],
  imports: [CommonModule],
})
export class RoadMapStoreModule {}

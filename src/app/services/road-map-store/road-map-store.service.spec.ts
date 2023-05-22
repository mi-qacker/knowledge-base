import {TestBed} from '@angular/core/testing';

import {RoadMapStoreService} from './road-map-store.service';

describe('RoadMapStoreService', () => {
  let service: RoadMapStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadMapStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

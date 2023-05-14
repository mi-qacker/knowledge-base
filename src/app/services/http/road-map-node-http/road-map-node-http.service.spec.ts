import {TestBed} from '@angular/core/testing';

import {RoadMapNodeHttpService} from './road-map-node-http.service';

describe('RoadMapNodeHttpService', () => {
  let service: RoadMapNodeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadMapNodeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RoadMapHttpService } from './road-map-http.service';

describe('RoadMapHttpService', () => {
  let service: RoadMapHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadMapHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

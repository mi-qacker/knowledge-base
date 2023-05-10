import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadMapsComponent} from './road-maps.component';

describe('RoadMapsComponent', () => {
  let component: RoadMapsComponent;
  let fixture: ComponentFixture<RoadMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapsComponent],
    });
    fixture = TestBed.createComponent(RoadMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

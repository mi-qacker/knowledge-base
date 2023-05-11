import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapPageComponent } from './road-map-page.component';

describe('RoadMapPageComponent', () => {
  let component: RoadMapPageComponent;
  let fixture: ComponentFixture<RoadMapPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapPageComponent]
    });
    fixture = TestBed.createComponent(RoadMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

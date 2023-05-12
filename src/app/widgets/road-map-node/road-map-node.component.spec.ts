import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadMapNodeComponent} from './road-map-node.component';

describe('RoadMapNodeComponent', () => {
  let component: RoadMapNodeComponent;
  let fixture: ComponentFixture<RoadMapNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapNodeComponent],
    });
    fixture = TestBed.createComponent(RoadMapNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

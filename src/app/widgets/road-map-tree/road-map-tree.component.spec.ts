import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadMapTreeComponent} from './road-map-tree.component';

describe('RoadMapTreeComponent', () => {
  let component: RoadMapTreeComponent;
  let fixture: ComponentFixture<RoadMapTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapTreeComponent],
    });
    fixture = TestBed.createComponent(RoadMapTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

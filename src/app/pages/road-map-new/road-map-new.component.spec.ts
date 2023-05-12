import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadMapNewComponent} from './road-map-new.component';

describe('RoadMapNewComponent', () => {
  let component: RoadMapNewComponent;
  let fixture: ComponentFixture<RoadMapNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapNewComponent],
    });
    fixture = TestBed.createComponent(RoadMapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

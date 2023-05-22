import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoadMapEditDialogComponent} from './road-map-edit-dialog.component';

describe('RoadMapEditDialogComponent', () => {
  let component: RoadMapEditDialogComponent;
  let fixture: ComponentFixture<RoadMapEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadMapEditDialogComponent],
    });
    fixture = TestBed.createComponent(RoadMapEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

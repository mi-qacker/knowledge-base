import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModerationPostComponent} from './moderation-post.component';

describe('ModerationPostComponent', () => {
  let component: ModerationPostComponent;
  let fixture: ComponentFixture<ModerationPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModerationPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModerationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

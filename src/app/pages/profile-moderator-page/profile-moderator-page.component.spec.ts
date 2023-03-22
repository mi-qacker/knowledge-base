import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileModeratorPageComponent} from './profile-moderator-page.component';

describe('ProfileModeratorPageComponent', () => {
  let component: ProfileModeratorPageComponent;
  let fixture: ComponentFixture<ProfileModeratorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileModeratorPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileModeratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

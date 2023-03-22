import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCategoriesPageComponent} from './admin-categories-page.component';

describe('AdminCategoriesPageComponent', () => {
  let component: AdminCategoriesPageComponent;
  let fixture: ComponentFixture<AdminCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoriesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

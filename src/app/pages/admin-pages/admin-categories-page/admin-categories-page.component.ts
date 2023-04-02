import {Component, OnInit} from '@angular/core';

import {AdminCategoriesService} from './admin-categories.service';

@Component({
  selector: 'app-admin-categories-page',
  templateUrl: './admin-categories-page.component.html',
  styleUrls: ['./admin-categories-page.component.scss'],
})
export class AdminCategoriesPageComponent implements OnInit {
  public categories$ = this.adminCategoriesService.categories$;
  newCategoryName: string = '';
  constructor(private adminCategoriesService: AdminCategoriesService) {}
  ngOnInit() {
    this.adminCategoriesService.loadCategories();
  }

  addNewCategory() {
    this.adminCategoriesService.createCategory({name: this.newCategoryName});
    this.newCategoryName = '';
  }
}

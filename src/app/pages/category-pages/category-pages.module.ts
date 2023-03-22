import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CategoriesListPageComponent} from './categories-list-page/categories-list-page.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {CategoryPagesRoutingModule} from './category-pages-routing.module';

@NgModule({
  declarations: [CategoryPageComponent, CategoriesListPageComponent],
  imports: [CommonModule, CategoryPagesRoutingModule],
})
export class CategoryPagesModule {}

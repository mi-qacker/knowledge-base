import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { CategoriesListPageComponent } from './categories-list-page/categories-list-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CategoryPagesRoutingModule } from './category-pages-routing.module';

@NgModule({
  declarations: [CategoryPageComponent, CategoriesListPageComponent],
  imports: [
    CommonModule,
    CategoryPagesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class CategoryPagesModule { }

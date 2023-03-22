import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CategoriesListPageComponent} from './categories-list-page/categories-list-page.component';
import {CategoryPageComponent} from './category-page/category-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: CategoriesListPageComponent},
  {path: ':id', component: CategoryPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPagesRoutingModule {}

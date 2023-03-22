import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminCategoriesPageComponent} from './admin-categories-page/admin-categories-page.component';
import {AdminUsersPageComponent} from './admin-users-page/admin-users-page.component';

const routes: Routes = [
  {path: 'users', component: AdminUsersPageComponent},
  {path: 'categories', component: AdminCategoriesPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}

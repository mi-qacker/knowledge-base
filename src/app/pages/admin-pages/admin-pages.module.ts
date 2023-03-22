import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AdminCategoriesPageComponent} from './admin-categories-page/admin-categories-page.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {AdminUsersPageComponent} from './admin-users-page/admin-users-page.component';

@NgModule({
  declarations: [AdminUsersPageComponent, AdminCategoriesPageComponent],
  imports: [CommonModule, AdminPagesRoutingModule],
})
export class AdminPagesModule {}

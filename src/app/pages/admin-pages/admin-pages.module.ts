import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import {SharedModule} from '../../shared/shared.module';
import {AdminCategoriesPageComponent} from './admin-categories-page/admin-categories-page.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {AdminUsersService} from './admin-users-page/admin-users.service';
import {AdminUsersPageComponent} from './admin-users-page/admin-users-page.component';

@NgModule({
  declarations: [AdminUsersPageComponent, AdminCategoriesPageComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [AdminUsersService],
})
export class AdminPagesModule {}

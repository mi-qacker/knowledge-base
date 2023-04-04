import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from 'app/shared/shared.module';

import {AdminCategoriesService} from './admin-categories-page/admin-categories.service';
import {AdminCategoriesPageComponent} from './admin-categories-page/admin-categories-page.component';
import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {AdminUsersService} from './admin-users-page/admin-users.service';
import {AdminUsersPageComponent} from './admin-users-page/admin-users-page.component';
import {CategoryEditDialogComponent} from './category-edit-dialog/category-edit-dialog.component';
import {UserEditDialogComponent} from './user-edit-dialog/user-edit-dialog.component';

@NgModule({
  declarations: [
    AdminUsersPageComponent,
    AdminCategoriesPageComponent,
    CategoryEditDialogComponent,
    UserEditDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [AdminUsersService, AdminCategoriesService],
})
export class AdminPagesModule {}

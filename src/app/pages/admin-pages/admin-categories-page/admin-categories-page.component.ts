import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ICategory} from '../../../services/http/category-http/category';
import {ConfirmDialogComponent} from '../../../shared/ui/confirm-dialog/confirm-dialog.component';
import {IConfirmDialogData} from '../../../shared/ui/confirm-dialog/confirm-dialog-data';
import {CategoryEditDialogComponent} from '../category-edit-dialog/category-edit-dialog.component';
import {AdminCategoriesService} from './admin-categories.service';

@Component({
  selector: 'app-admin-categories-page',
  templateUrl: './admin-categories-page.component.html',
  styleUrls: ['./admin-categories-page.component.scss'],
})
export class AdminCategoriesPageComponent implements OnInit {
  public categories$ = this.adminCategoriesService.categories$;
  newCategoryName: string = '';
  constructor(
    private adminCategoriesService: AdminCategoriesService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.adminCategoriesService.loadCategories();
  }

  addNewCategory() {
    this.adminCategoriesService.createCategory({name: this.newCategoryName});
    this.newCategoryName = '';
  }

  openEditDialog(category: ICategory) {
    const dialogRef = this.dialog.open<
      CategoryEditDialogComponent,
      ICategory,
      ICategory
    >(CategoryEditDialogComponent, {
      minWidth: '480px',
      data: {...category},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.adminCategoriesService.editCategory(result.id, {
          name: result.name,
        });
    });
  }

  deleteCategory(category: ICategory) {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      IConfirmDialogData,
      boolean
    >(ConfirmDialogComponent, {
      data: {
        title: 'Удаление категории',
        content: `Вы действительно хотите удалить категорию «${category.name}»?`,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.adminCategoriesService.deleteCategory(category.id);
    });
  }
}

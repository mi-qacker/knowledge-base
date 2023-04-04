import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {IKnowledgeUser} from 'app/services/http/knowledge-users-http/knowledge-user';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent implements OnInit {
  public categories = new FormControl<string[]>(
    {value: this.data.categoriesAdmin.map(c => c.id), disabled: true},
    Validators.required
  );
  public categoriesList: ICategory[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IKnowledgeUser,
    private categoryHttpService: CategoryHttpService
  ) {}

  ngOnInit() {
    this.categoryHttpService.getCategories().subscribe(categories => {
      this.categoriesList = categories;
      this.categories.enable();
    });
  }
}

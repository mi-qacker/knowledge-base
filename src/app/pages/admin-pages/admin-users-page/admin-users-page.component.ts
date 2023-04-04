import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {IKnowledgeUser} from 'app/services/http/knowledge-users-http/knowledge-user';

import {UserEditDialogComponent} from '../user-edit-dialog/user-edit-dialog.component';
import {AdminUsersService} from './admin-users.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss'],
})
export class AdminUsersPageComponent implements OnInit {
  users$ = this.adminUsersService.knowledgeUsers$;
  email = new FormControl<string>('', [Validators.email, Validators.required]);

  constructor(
    private adminUsersService: AdminUsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.adminUsersService.loadUsers();
  }

  editModerator(user: IKnowledgeUser) {
    const dialogRef = this.dialog.open<
      UserEditDialogComponent,
      IKnowledgeUser,
      string[]
    >(UserEditDialogComponent, {minWidth: '480px', data: {...user}});
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.adminUsersService.editModeratorCategories(user.id, result);
    });
  }

  inviteModerator() {
    const emailValue = this.email.value;
    if (!emailValue) return;
    this.email.setErrors(null);
    this.adminUsersService.inviteModerator(
      emailValue,
      () => {
        this.email.setErrors({notFound: true});
      },
      () => {
        this.email.setValue('');
        this.email.setErrors(null);
      }
    );
  }
}

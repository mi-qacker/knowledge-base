import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {AuthHttpService} from 'app/services/http/auth-http/auth-http.service';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {IKnowledgeUser} from 'app/services/http/knowledge-users-http/knowledge-user';
import {KnowledgeUsersHttpService} from 'app/services/http/knowledge-users-http/knowledge-users-http.service';
import {ConfirmDialogComponent} from 'app/shared/ui/confirm-dialog/confirm-dialog.component';
import {IConfirmDialogData} from 'app/shared/ui/confirm-dialog/confirm-dialog-data';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-profile-moderator-page',
  templateUrl: './profile-moderator-page.component.html',
  styleUrls: ['./profile-moderator-page.component.scss'],
})
export class ProfileModeratorPageComponent {
  moderator$: BehaviorSubject<IKnowledgeUser | null | undefined> =
    new BehaviorSubject<IKnowledgeUser | null | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private authHttpService: AuthHttpService,
    private categoryHttpService: CategoryHttpService,
    private knowledgeUserHttpService: KnowledgeUsersHttpService,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe(({id}) => {
      this.loadModerator(id);
    });
  }

  private loadModerator(id: string) {
    this.knowledgeUserHttpService
      .getKnowledgeUserById(id)
      .subscribe(moderator => {
        this.moderator$.next(moderator);
      });
  }

  deleteCategory(category: ICategory, moderator: IKnowledgeUser) {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      IConfirmDialogData,
      boolean
    >(ConfirmDialogComponent, {
      width: '480px',
      data: {
        title: 'Убрать доступ к категории',
        content: `Вы действительно хотите убрать доступ к категории «${category.name}» для ${moderator.user.firstName} ${moderator.user.lastName}?`,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.knowledgeUserHttpService
          .patchKnowledgeUserById(
            moderator.id,
            moderator.categoriesAdmin
              .filter(c => c.id !== category.id)
              .map(c => c.id)
          )
          .subscribe(() => this.loadModerator(moderator.user._id));
    });
  }
}

import {Injectable} from '@angular/core';
import {KnowledgeUsersHttpService} from 'app/services/http/knowledge-users-http/knowledge-users-http.service';
import {BehaviorSubject} from 'rxjs';

import {IKnowledgeUser} from '../../../services/http/knowledge-users-http/knowledge-user';

@Injectable()
export class AdminUsersService {
  private _knowledgeUsers$ = new BehaviorSubject<IKnowledgeUser[] | undefined>(
    undefined
  );
  public knowledgeUsers$ = this._knowledgeUsers$.asObservable();

  constructor(private knowledgeUsersHttpService: KnowledgeUsersHttpService) {}

  loadUsers() {
    this.knowledgeUsersHttpService.getKnowledgeUsers().subscribe(users => {
      this._knowledgeUsers$.next(users);
    });
  }

  inviteModerator(email: string, error: () => void, success: () => void) {
    this.knowledgeUsersHttpService
      .postKnowledgeUserByEmail(email)
      .subscribe(newUser => {
        if (!newUser) {
          error();
          return;
        }
        success();
        const oldUsers = this._knowledgeUsers$.value;
        if (oldUsers) this._knowledgeUsers$.next([...oldUsers, newUser]);
        else this._knowledgeUsers$.next([newUser]);
      });
  }

  editModeratorCategories(id: string, categories: string[]) {
    this.knowledgeUsersHttpService
      .patchKnowledgeUserByEmail(id, categories)
      .subscribe(() => this.loadUsers());
  }
}

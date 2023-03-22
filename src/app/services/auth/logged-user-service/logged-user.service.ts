import {Injectable} from '@angular/core';
import {KnowledgeUsersHttpService} from 'app/services/http/knowledge-users-http/knowledge-users-http.service';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';

import {IUser} from '../../http/auth-http/user.interface';
import {IKnowledgeUser} from '../../http/knowledge-users-http/knowledge-user';
import {AuthModule} from '../auth.module';

@Injectable({
  providedIn: AuthModule,
})
export class LoggedUserService {
  private _user$ = new BehaviorSubject<IUser | undefined | null>(undefined);
  public user$: Observable<null | undefined | IKnowledgeUser> =
    this._user$.pipe(
      switchMap(user => {
        if (user === null || user === undefined) return of(user);
        return this.knowledgeUsersHttpService.getKnowledgeUserById(user._id);
      })
    );

  constructor(private knowledgeUsersHttpService: KnowledgeUsersHttpService) {}

  loginUser(user: IUser) {
    this._user$.next(user);
  }

  logoutUser() {
    this._user$.next(null);
  }
}

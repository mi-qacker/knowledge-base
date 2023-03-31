import {Injectable} from '@angular/core';
import {KnowledgeUsersHttpService} from 'app/services/http/knowledge-users-http/knowledge-users-http.service';
import {BehaviorSubject} from 'rxjs';

import {IUser} from '../../http/auth-http/user.interface';
import {IKnowledgeUser} from '../../http/knowledge-users-http/knowledge-user';
import {AuthModule} from '../auth.module';

@Injectable({
  providedIn: AuthModule,
})
export class LoggedUserService {
  private _user$ = new BehaviorSubject<IUser | undefined | null>(undefined);
  public user$ = this._user$.asObservable();

  private _knowledgeUser$ = new BehaviorSubject<
    IKnowledgeUser | undefined | null
  >(undefined);
  public knowledgeUser$ = this._knowledgeUser$.asObservable();
  constructor(private knowledgeUsersHttpService: KnowledgeUsersHttpService) {}

  loginUser(user: IUser) {
    this._user$.next(user);
    this.knowledgeUsersHttpService
      .getKnowledgeUserById(user._id)
      .subscribe(knowledgeUser => {
        this._knowledgeUser$.next(knowledgeUser);
      });
  }

  logoutUser() {
    this._user$.next(null);
  }
}

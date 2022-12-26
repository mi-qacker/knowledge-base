import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserService {
  private _user$ = new BehaviorSubject<User | null>(null);
  public user$ = this._user$.asObservable();

  loginUser(user: User) {
    this._user$.next(user);
  }

  logoutUser() {
    this._user$.next(null);
  }
}

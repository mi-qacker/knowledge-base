import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';

import {LoginUserDto, RegisterUserDto, User} from '../../models/user.model';
import {LoggedUserService} from '../logged-user/logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiPath = 'api/user';
  constructor(
    private http: HttpClient,
    private loggedUserService: LoggedUserService
  ) {}

  getLoggedUser(): Observable<User> {
    return this.http
      .get<User>(this.apiPath, {
        withCredentials: true,
      })
      .pipe(tap(user => this.loggedUserService.loginUser(user)));
  }

  loginUser(user: LoginUserDto): Observable<User> {
    return this.http
      .post<User>(`${this.apiPath}/login`, user, {
        withCredentials: true,
      })
      .pipe(tap(user => this.loggedUserService.loginUser(user)));
  }

  registerUser(user: RegisterUserDto): Observable<User> {
    return this.http
      .post<User>(`${this.apiPath}/register`, user, {
        withCredentials: true,
      })
      .pipe(tap(user => this.loggedUserService.loginUser(user)));
  }

  logoutUser() {
    return this.http
      .get(`${this.apiPath}/logout`, {
        withCredentials: true,
      })
      .pipe(tap(() => this.loggedUserService.logoutUser()));
  }
}

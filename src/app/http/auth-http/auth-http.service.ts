import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  ILoginUserDto,
  IRegisterUserDto,
  IUser,
} from 'app/http/auth-http/user.interface';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';

@Injectable({
  providedIn: HttpModule,
})
export class AuthHttpService {
  private apiPath = 'api/user';
  constructor(private http: HttpClient) {}

  getLoggedUser(): Observable<IUser> {
    return this.http.get<IUser>(this.apiPath, {
      withCredentials: true,
    });
  }

  loginUser(user: ILoginUserDto): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiPath}/login`, user, {
      withCredentials: true,
    });
  }

  registerUser(user: IRegisterUserDto): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiPath}/register`, user, {
      withCredentials: true,
    });
  }

  logoutUser() {
    return this.http.get(`${this.apiPath}/logout`, {
      withCredentials: true,
    });
  }
}

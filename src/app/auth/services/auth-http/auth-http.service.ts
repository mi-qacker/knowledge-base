import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AuthModule} from '../../auth.module';
import {LoginUserDto, RegisterUserDto, User} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private apiPath = 'api/user';
  constructor(private http: HttpClient) {}

  loginUser(user: LoginUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiPath}/login'`, user, {
      withCredentials: true,
    });
  }

  registerUser(user: RegisterUserDto): Observable<User> {
    return this.http.post<User>(`${this.apiPath}/register`, user, {
      withCredentials: true,
    });
  }
}

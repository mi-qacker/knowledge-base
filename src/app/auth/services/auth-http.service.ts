import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDto, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  loginUser(user: LoginUserDto) {
    return this.http.post('api/user/login', user, {
      observe: 'response',
      withCredentials: true,
    });
  }
}

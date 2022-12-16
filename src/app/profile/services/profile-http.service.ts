import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get<IUser>('api/user', { withCredentials: true });
  }
}

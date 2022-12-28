import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IPost} from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  private apiPath = 'api/v1/posts';
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiPath}`);
  }
}

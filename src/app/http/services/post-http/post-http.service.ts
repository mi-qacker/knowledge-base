import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IPost} from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  private apiPath = 'api/v1/posts';
  constructor(private http: HttpClient) {}

  getPosts(moderation: boolean): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiPath}`, {
      params: {moderation: `${moderation}`},
    });
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiPath}/${id}`);
  }

  postNewPost(newPost: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>(this.apiPath, newPost);
  }
}

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

  getPostByUserId(userId: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiPath, {params: {userId}});
  }

  postNewPost(newPost: Omit<IPost, 'id'>): Observable<IPost> {
    return this.http.post<IPost>(this.apiPath, newPost);
  }

  addLike(post: IPost, userId: string): Observable<IPost> {
    const postId = post.id;
    const likes = [...post.likes, userId];
    const moderation = likes.length >= 2;
    return this.http.patch<IPost>(`${this.apiPath}/${postId}`, {
      likes,
      moderation,
    });
  }

  removeLike(post: IPost, userId: string): Observable<IPost> {
    const postId = post.id;
    const likes = post.likes.filter(id => id !== userId);
    const moderation = likes.length >= 2;
    return this.http.patch<IPost>(`${this.apiPath}/${postId}`, {
      likes,
      moderation,
    });
  }
}

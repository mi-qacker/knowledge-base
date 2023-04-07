import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {IPost, IPostCreateDto, IPostsFilters} from './post.interface';

@Injectable({
  providedIn: HttpModule,
})
export class PostHttpService {
  private apiPath = 'api/articles';

  constructor(private http: HttpClient) {}

  getPosts(filters: IPostsFilters): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.apiPath}`, {
      params: new HttpParams({fromObject: {...filters}}),
    });
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiPath}/${id}`);
  }

  getPostByUserId(userId: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiPath, {params: {userId}});
  }

  postNewPost(newPost: IPostCreateDto): Observable<IPost> {
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

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiPath}/${postId}`);
  }
}

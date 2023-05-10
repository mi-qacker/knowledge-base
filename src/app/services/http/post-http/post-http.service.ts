import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpModule} from '../http.module';
import {IPost, IPostCreateDto, IPostsFilters} from './post.interface';

@Injectable({
  providedIn: HttpModule,
})
export class PostHttpService {
  private apiPath = 'api/articles';

  constructor(private http: HttpClient) {}

  private convertPostDates = (post: IPost): IPost => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  });

  private sortPosts = (a: IPost, b: IPost): number =>
    b.createdAt.getTime() - a.createdAt.getTime();

  getPosts(filters: IPostsFilters): Observable<IPost[]> {
    return this.http
      .get<IPost[]>(`${this.apiPath}`, {
        params: new HttpParams({fromObject: {...filters}}),
      })
      .pipe(
        map(posts => posts.map(this.convertPostDates).sort(this.sortPosts))
      );
  }

  getPostById(id: string): Observable<IPost> {
    return this.http
      .get<IPost>(`${this.apiPath}/${id}`)
      .pipe(map(this.convertPostDates));
  }

  getPostByUserId(userId: string): Observable<IPost[]> {
    return this.http
      .get<IPost[]>(this.apiPath, {params: {userId}})
      .pipe(
        map(posts => posts.map(this.convertPostDates).sort(this.sortPosts))
      );
  }

  postNewPost(newPost: IPostCreateDto): Observable<IPost> {
    return this.http
      .post<IPost>(this.apiPath, newPost)
      .pipe(map(this.convertPostDates));
  }

  addLike(post: IPost, userId: string): Observable<IPost> {
    const postId = post.id;
    const likes = [...post.likes, userId];
    return this.http
      .patch<IPost>(`${this.apiPath}/${postId}`, {
        likes,
      })
      .pipe(map(this.convertPostDates));
  }

  removeLike(post: IPost, userId: string): Observable<IPost> {
    const postId = post.id;
    const likes = post.likes.filter(id => id !== userId);
    return this.http
      .patch<IPost>(`${this.apiPath}/${postId}`, {
        likes,
      })
      .pipe(map(this.convertPostDates));
  }

  setModeration(postId: string, moderation: boolean): Observable<IPost> {
    return this.http
      .patch<IPost>(`${this.apiPath}/${postId}`, {
        moderation,
      })
      .pipe(map(this.convertPostDates));
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiPath}/${postId}`);
  }
}

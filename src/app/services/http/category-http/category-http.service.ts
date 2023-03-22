import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {ICategory} from './category';

@Injectable({
  providedIn: HttpModule,
})
export class CategoryHttpService {
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) {}

  postCategory(category: Omit<ICategory, 'id'>): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiPath, category);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiPath);
  }

  getCategoryById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiPath}/${id}`);
  }

  patchCategory(
    id: string,
    category: Partial<ICategory>
  ): Observable<ICategory> {
    return this.http.patch<ICategory>(`${this.apiPath}/${id}`, category);
  }

  deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`${this.apiPath}/${id}`);
  }
}

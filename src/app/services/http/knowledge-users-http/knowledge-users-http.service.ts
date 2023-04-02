import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {IKnowledgeUser} from './knowledge-user';

@Injectable({providedIn: HttpModule})
export class KnowledgeUsersHttpService {
  private apiPath = 'api/knowledge-users';

  constructor(private http: HttpClient) {}

  getKnowledgeUserById(id: string): Observable<IKnowledgeUser | null> {
    return this.http.get<IKnowledgeUser | null>(`${this.apiPath}/${id}`);
  }

  getKnowledgeUsers(): Observable<IKnowledgeUser[]> {
    return this.http.get<IKnowledgeUser[]>(this.apiPath);
  }
}

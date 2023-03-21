import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {IKnowledgeUser} from './knowledge-user';

@Injectable()
export class KnowledgeUsersHttpService {
  private apiPath = 'api/knowledge-users';
  constructor(private http: HttpClient) {}

  getKnowledgeUserById(id: string): Observable<IKnowledgeUser> {
    return this.http.get<IKnowledgeUser>(`${this.apiPath}/${id}`);
  }
}

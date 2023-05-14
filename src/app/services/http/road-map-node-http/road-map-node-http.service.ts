import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {
  ICreateRoadMapNodeDto,
  IRoadMapNode,
  IRoadMapNodeFilter,
} from './road-map-node';

@Injectable({
  providedIn: HttpModule,
})
export class RoadMapNodeHttpService {
  private readonly apiPath = '/api/road-map-node';
  constructor(private http: HttpClient) {}

  getRoadMapNodes(filters: IRoadMapNodeFilter): Observable<IRoadMapNode[]> {
    return this.http.get<IRoadMapNode[]>(this.apiPath, {
      params: new HttpParams({fromObject: {...filters}}),
    });
  }

  getRoadMapNodeById(id: string): Observable<IRoadMapNode> {
    return this.http.get<IRoadMapNode>(`${this.apiPath}/${id}`);
  }

  editRoadMapNode(
    id: string,
    roadMapNode: Partial<ICreateRoadMapNodeDto>
  ): Observable<IRoadMapNode> {
    return this.http.patch<IRoadMapNode>(`${this.apiPath}/${id}`, roadMapNode);
  }
}

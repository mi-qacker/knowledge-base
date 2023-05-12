import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {ICreateRoadMapDto, IRoadMap} from './road-map';

@Injectable({
  providedIn: HttpModule,
})
export class RoadMapHttpService {
  private readonly apiPath = 'api/road-map';
  constructor(private http: HttpClient) {}

  getRoadMaps(): Observable<IRoadMap[]> {
    return this.http.get<IRoadMap[]>(this.apiPath);
  }

  getRoadMapById(id: string): Observable<IRoadMap> {
    return this.http.get<IRoadMap>(`${this.apiPath}/${id}`);
  }

  createRoadMap(newRoadMap: ICreateRoadMapDto): Observable<IRoadMap> {
    return this.http.post<IRoadMap>(this.apiPath, newRoadMap);
  }

  updateRoadMap(
    id: string,
    updateRoadMap: Partial<Omit<IRoadMap, 'id'>>
  ): Observable<IRoadMap> {
    return this.http.patch<IRoadMap>(`${this.apiPath}/${id}`, updateRoadMap);
  }
}

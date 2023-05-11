import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpModule} from '../http.module';
import {IRoadMap} from './road-map';

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
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../auth/logged-user-service/logged-user.service';
import {IUser} from '../http/auth-http/user.interface';
import {IRoadMap} from '../http/road-map-http/road-map';
import {RoadMapHttpService} from '../http/road-map-http/road-map-http.service';
import {
  ICreateRoadMapNodeDto,
  IRoadMapNode,
} from '../http/road-map-node-http/road-map-node';
import {RoadMapNodeHttpService} from '../http/road-map-node-http/road-map-node-http.service';

@Injectable()
export class RoadMapStoreService {
  private _roadMap$ = new BehaviorSubject<IRoadMap | undefined>(undefined);
  private _roadMapNodes$ = new BehaviorSubject<IRoadMapNode[] | undefined>(
    undefined
  );

  public roadMap$: Observable<IRoadMap | undefined> =
    this._roadMap$.asObservable();
  public roadMapNodes$: Observable<IRoadMapNode[] | undefined> =
    this._roadMapNodes$.asObservable();
  public isOwnerRoadMap$: Observable<boolean> = combineLatest([
    this.roadMap$,
    this.loggedUserService.user$,
  ]).pipe(map(([roadMap, user]) => this.checkIsOwnerRoadMap(roadMap, user)));

  constructor(
    private roadMapHttpService: RoadMapHttpService,
    private roadMapNodeHttpService: RoadMapNodeHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  public loadRoadMap(roadMapId: string): void {
    this.roadMapHttpService.getRoadMapById(roadMapId).subscribe(roadMap => {
      this._roadMap$.next(roadMap);
    });
    this.roadMapNodeHttpService
      .getRoadMapNodes({roadMap: roadMapId})
      .subscribe(roadMapNodes => {
        this._roadMapNodes$.next(roadMapNodes);
      });
  }

  public editRoadMapNode(
    roadMapId: string,
    newData: Partial<ICreateRoadMapNodeDto>
  ): void {
    this.roadMapNodeHttpService
      .editRoadMapNode(roadMapId, newData)
      .subscribe(newRoadMapNode => {
        const roadMapNodes = this._roadMapNodes$.value;
        if (!roadMapNodes) {
          throw new Error('Список узлов дорожной карты должен быть загружен');
        }
        const newNodes = roadMapNodes.map(node =>
          node.id === newRoadMapNode.id ? newRoadMapNode : node
        );
        this._roadMapNodes$.next([...newNodes]);
      });
  }

  public selectNode(
    roadMapNodeId: string
  ): Observable<IRoadMapNode | undefined> {
    return this.roadMapNodes$.pipe(
      map(nodes => nodes?.find(node => node.id === roadMapNodeId))
    );
  }

  private checkIsOwnerRoadMap(
    roadMap: IRoadMap | undefined,
    user: IUser | null | undefined
  ): boolean {
    if (roadMap && user) {
      return roadMap.author._id === user._id;
    } else {
      return false;
    }
  }
}

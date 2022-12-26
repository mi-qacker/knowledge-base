import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../../services/logged-user/logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class NonLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private loggedUserService: LoggedUserService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loggedUserService.user$.pipe(
      map(user => {
        return user !== null ? this.router.createUrlTree(['/']) : true;
      })
    );
  }
}

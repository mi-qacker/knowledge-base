import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../../services/logged-user/logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  public loading$ = new BehaviorSubject<boolean>(false);

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
    this.loading$.next(true);
    return this.loggedUserService.user$.pipe(
      map(user => {
        if (user === undefined) return false;
        this.loading$.next(false);
        return user === null
          ? this.router.createUrlTree(['/auth/login'])
          : true;
      })
    );
  }
}

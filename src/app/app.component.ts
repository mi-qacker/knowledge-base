import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginGuard} from './auth/guards/login/login.guard';
import {NonLoginGuard} from './auth/guards/non-login/non-login.guard';
import {AuthHttpService} from './auth/services/auth-http/auth-http.service';
import {LoggedUserService} from './auth/services/logged-user/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$ = this.loggedUserService.user$;
  loading$ = this.loginGuard.loading$;
  constructor(
    private router: Router,
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService,
    private loginGuard: LoginGuard
  ) {}

  ngOnInit(): void {
    this.authHttpService.getLoggedUser().subscribe({
      next: user => this.loggedUserService.loginUser(user),
      error: () => this.loggedUserService.logoutUser(),
    });
  }

  logoutUser() {
    this.authHttpService.logoutUser().subscribe(async () => {
      this.loggedUserService.logoutUser();
      await this.router.navigateByUrl('/');
    });
  }
}

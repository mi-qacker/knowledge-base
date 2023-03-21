import {Component, OnInit} from '@angular/core';

import {LoginGuard} from './auth/guards/login/login.guard';
import {LoggedUserService} from './auth/services/logged-user/logged-user.service';
import {AuthHttpService} from './http/auth-http/auth-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$ = this.loginGuard.loading$;

  constructor(
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
}

import {Component, OnInit} from '@angular/core';

import {LoggedUserService} from './auth/logged-user-service/logged-user.service';
import {AuthHttpService} from './http/auth-http/auth-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // loading$ = this.loginGuard.loading$;

  constructor(
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.authHttpService.getLoggedUser().subscribe({
      next: user => this.loggedUserService.loginUser(user),
      error: () => this.loggedUserService.logoutUser(),
    });
  }
}

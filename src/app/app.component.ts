import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthHttpService} from './auth/services/auth-http/auth-http.service';
import {LoggedUserService} from './auth/services/logged-user/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$ = this.loggedUserService.user$;
  constructor(
    private router: Router,
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.authHttpService.getLoggedUser().subscribe();
  }

  logoutUser() {
    this.authHttpService.logoutUser().subscribe(async () => {
      await this.router.navigateByUrl('/');
    });
  }
}

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Router, RouterModule} from '@angular/router';

import {LoggedUserService} from '../../services/auth/logged-user-service/logged-user.service';
import {AuthHttpService} from '../../services/http/auth-http/auth-http.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user$ = this.loggedUserService.user$;
  knowledgeUser$ = this.loggedUserService.knowledgeUser$;

  constructor(
    private router: Router,
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  logoutUser() {
    this.authHttpService.logoutUser().subscribe(async () => {
      this.loggedUserService.logoutUser();
      await this.router.navigateByUrl('/');
    });
  }
}

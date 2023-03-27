/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shareReplay } from 'rxjs';
import { Observable } from 'rxjs';

import { AuthHttpService } from '../../services/http/auth-http/auth-http.service';
import { ICategory } from '../../services/http/category-http/category';
import { CategoryHttpService } from '../../services/http/category-http/category-http.service';

@Component({
  selector: 'app-profile-moderator-page',
  templateUrl: './profile-moderator-page.component.html',
  styleUrls: ['./profile-moderator-page.component.scss'],
})
export class ProfileModeratorPageComponent implements OnInit {
  user$ = this.authHttpService.getLoggedUser().pipe(shareReplay(1));
  categories$!: Observable<ICategory[]>;
  userID!: string;

  constructor(
    private route: ActivatedRoute,
    private authHttpService: AuthHttpService,
    private categoryHttpService: CategoryHttpService
  ) {
    this.route.params.subscribe(({ id }) => {
      this.userID = id;
    });
  }

  ngOnInit(): void {
    this.categories$ = this.categoryHttpService.getCategories();
  }
}

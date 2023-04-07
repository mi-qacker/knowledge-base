import {Component} from '@angular/core';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {BehaviorSubject, filter, Observable, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

import {PostHttpService} from '../../../services/http/post-http/post-http.service';

@Component({
  selector: 'app-moderation-page',
  templateUrl: './moderation-page.component.html',
  styleUrls: ['./moderation-page.component.scss'],
})
export class ModerationPageComponent {
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));
  categories$: Observable<undefined | ICategory[]>;
  selectedCategory$ = new BehaviorSubject<string | undefined>(undefined);
  selectedCategory?: string;
  posts$ = this.selectedCategory$.pipe(
    filter(selected => selected !== undefined),
    switchMap(selected => {
      this.selectedCategory = selected;
      return this.postHttpService.getPosts({
        moderation: false,
        categoryId: selected,
      });
    })
  );

  constructor(
    private loggedUserService: LoggedUserService,
    private categoryHttpService: CategoryHttpService,
    private postHttpService: PostHttpService
  ) {
    this.categories$ = this.loggedUserService.knowledgeUser$.pipe(
      switchMap(user => {
        if (!user) return of(undefined);
        return user.mainAdmin
          ? this.categoryHttpService.getCategories()
          : of(user.categoriesAdmin);
      })
    );
  }

  selectCategory(categoryId: string) {
    this.selectedCategory$.next(categoryId);
  }
}

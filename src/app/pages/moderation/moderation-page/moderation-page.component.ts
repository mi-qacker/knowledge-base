import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {PostHttpService} from 'app/services/http/post-http/post-http.service';
import {BehaviorSubject, filter, Observable, of, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-moderation-page',
  templateUrl: './moderation-page.component.html',
  styleUrls: ['./moderation-page.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({opacity: 0}),
            stagger(100, [animate('0.25s', style({opacity: 1}))]),
          ],
          {optional: true}
        ),
      ]),
    ]),
  ],
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loggedUserService: LoggedUserService,
    private categoryHttpService: CategoryHttpService,
    private postHttpService: PostHttpService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      this.selectedCategory$.next(categoryId);
    });
    this.categories$ = this.loggedUserService.knowledgeUser$.pipe(
      switchMap(user => {
        if (!user) return of(undefined);
        return user.mainAdmin
          ? this.categoryHttpService.getCategories()
          : of(user.categoriesAdmin);
      })
    );
  }

  async selectCategory(categoryId: string) {
    const queryParams = {categoryId};
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}

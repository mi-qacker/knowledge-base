import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {ActivatedRoute, Router} from '@angular/router';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {PostHttpService} from 'app/services/http/post-http/post-http.service';
import {PostModule} from 'app/widgets/post/post.module';
import {BehaviorSubject, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, PostModule, MatListModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
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
export default class AllPostsComponent {
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));
  categories$ = this.categoryHttpService.getCategories();
  selectedCategory$ = new BehaviorSubject<string | undefined>(undefined);
  selectedCategory?: string;
  posts$ = this.selectedCategory$.pipe(
    switchMap(selected => {
      this.selectedCategory = selected;
      return this.postHttpService.getPosts(
        selected ? {moderation: true, categoryId: selected} : {moderation: true}
      );
    })
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService,
    private categoryHttpService: CategoryHttpService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      this.selectedCategory$.next(categoryId);
    });
  }

  async selectCategory(category?: ICategory) {
    const queryParams = category ? {categoryId: category.id} : {};
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
  }
}

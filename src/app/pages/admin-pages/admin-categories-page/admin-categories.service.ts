import {Injectable} from '@angular/core';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {IKnowledgeUser} from 'app/services/http/knowledge-users-http/knowledge-user';
import {KnowledgeUsersHttpService} from 'app/services/http/knowledge-users-http/knowledge-users-http.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

type TCategoryItem = ICategory & {moderatorsCount?: number};

@Injectable({
  providedIn: 'root',
})
export class AdminCategoriesService {
  private _categories$ = new BehaviorSubject<ICategory[] | undefined>(
    undefined
  );
  private _knowledgeUsers$ = new BehaviorSubject<IKnowledgeUser[] | undefined>(
    undefined
  );
  public categories$: Observable<TCategoryItem[] | undefined> = combineLatest([
    this._categories$,
    this._knowledgeUsers$,
  ]).pipe(
    map(([categories, users]) =>
      !users
        ? categories
        : categories?.map(category => ({
            ...category,
            moderatorsCount: this.getCategoryModeratorsCount(
              category.id,
              users
            ),
          }))
    )
  );

  constructor(
    private categoriesHttpService: CategoryHttpService,
    private knowledgeUsersHttpService: KnowledgeUsersHttpService
  ) {}

  loadCategories() {
    this.categoriesHttpService.getCategories().subscribe(categories => {
      this._categories$.next(categories);
    });
    this.knowledgeUsersHttpService.getKnowledgeUsers().subscribe(users => {
      this._knowledgeUsers$.next(users);
    });
  }

  createCategory(category: Omit<ICategory, 'id'>) {
    this.categoriesHttpService.postCategory(category).subscribe(res => {
      const categories = this._categories$.value;
      if (!categories) {
        this._categories$.next([res]);
        return;
      }
      this._categories$.next([...categories, res]);
    });
  }

  private getCategoryModeratorsCount(
    categoryId: string,
    moderators: IKnowledgeUser[]
  ): number {
    return moderators.filter(
      moderator =>
        moderator.categoriesAdmin.filter(
          moderatorCategory => moderatorCategory.id === categoryId
        ).length > 0
    ).length;
  }
}

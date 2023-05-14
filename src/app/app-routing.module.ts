import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {
    path: 'posts',
    title: 'Публикации',
    loadComponent: () => import('./pages/all-posts/all-posts.component'),
  },
  {
    path: 'maps',
    title: 'Дорожные карты',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/road-maps/road-maps.component'),
      },
      {
        path: 'new',
        title: 'Создание дорожной карты',
        loadComponent: () =>
          import('./pages/road-map-new/road-map-new.component'),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/road-map-page/road-map-page.component'),
      },
    ],
  },
  {
    path: 'login',
    title: 'Войти',
    loadComponent: () => import('./pages/login-page/login-page.component'),
  },
  {
    path: 'registration',
    title: 'Регистрация',
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component'),
  },
  {
    path: 'profile',
    title: 'Профиль',
    loadChildren: () => import('./pages/profile-page/profile-page.module'),
  },
  {
    path: 'moderator',
    title: 'Страница модератора',
    loadChildren: () =>
      import('./pages/profile-moderator-page/profile-moderator-page.module'),
  },
  {
    path: 'moderation',
    title: 'Лаборатория',
    loadChildren: () => import('./pages/moderation/moderation.module'),
  },
  {
    path: 'new',
    title: 'Создание публикации',
    loadComponent: () => import('./pages/editor-page/editor-page.component'),
  },
  {
    path: 'post',
    title: 'Публикация',
    loadChildren: () => import('./pages/post-page/post-page.module'),
  },
  {
    path: 'category',
    title: 'Категории',
    loadChildren: () => import('./pages/category-pages/category-pages.module'),
  },
  {
    path: 'admin',
    title: 'Панель администратора',
    loadChildren: () => import('./pages/admin-pages/admin-pages.module'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

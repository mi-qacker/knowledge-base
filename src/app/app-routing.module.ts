import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/all-posts/all-posts.component').then(
        c => c.AllPostsComponent
      ),
  },
  {
    path: 'maps',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/road-maps/road-maps.component').then(
            c => c.RoadMapsComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/road-map-page/road-map-page.component').then(
            c => c.RoadMapPageComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        c => c.LoginPageComponent
      ),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component').then(
        c => c.RegistrationPageComponent
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile-page/profile-page.module').then(
        m => m.ProfilePageModule
      ),
  },
  {
    path: 'moderator',
    loadChildren: () =>
      import(
        './pages/profile-moderator-page/profile-moderator-page.module'
      ).then(m => m.ProfileModeratorPageModule),
  },
  {
    path: 'moderation',
    loadChildren: () =>
      import('./pages/moderation/moderation.module').then(
        m => m.ModerationModule
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/editor-page/editor-page.component').then(
        c => c.EditorPageComponent
      ),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post-page/post-page.module').then(m => m.PostPageModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category-pages/category-pages.module').then(
        m => m.CategoryPagesModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-pages/admin-pages.module').then(
        m => m.AdminPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'all'},
  {
    path: 'all',
    loadComponent: () =>
      import('./pages/all-posts/all-posts.component').then(
        c => c.AllPostsComponent
      ),
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
    path: 'sandbox',
    loadChildren: () =>
      import('./sandbox/sandbox.module').then(m => m.SandboxModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post-page/post-page.module').then(m => m.PostPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

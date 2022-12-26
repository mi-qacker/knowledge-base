import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginGuard} from '../auth/guards/login/login.guard';
import {NewPostComponent} from './pages/new-post/new-post.component';
import {PostsListComponent} from './pages/posts-list/posts-list.component';

const routes: Routes = [
  {path: '', component: PostsListComponent, canActivate: [LoginGuard]},
  {path: 'new', component: NewPostComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxRoutingModule {}

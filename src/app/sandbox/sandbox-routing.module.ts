import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewPostComponent} from './pages/new-post/new-post.component';
import {PostsListComponent} from './pages/posts-list/posts-list.component';

const routes: Routes = [
  {path: '', component: PostsListComponent},
  {path: 'new', component: NewPostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandboxRoutingModule {}

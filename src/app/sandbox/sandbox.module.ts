import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NewPostComponent} from './pages/new-post/new-post.component';
import {PostsListComponent} from './pages/posts-list/posts-list.component';
import {SandboxRoutingModule} from './sandbox-routing.module';

@NgModule({
  declarations: [NewPostComponent, PostsListComponent],
  imports: [CommonModule, SandboxRoutingModule],
})
export class SandboxModule {}

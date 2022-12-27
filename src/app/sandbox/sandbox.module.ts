import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import {NewPostComponent} from './pages/new-post/new-post.component';
import {PostsListComponent} from './pages/posts-list/posts-list.component';
import {SandboxRoutingModule} from './sandbox-routing.module';

@NgModule({
  declarations: [NewPostComponent, PostsListComponent],
  imports: [
    CommonModule,
    SandboxRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
})
export class SandboxModule {}

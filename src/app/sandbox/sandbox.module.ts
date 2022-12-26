import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxRoutingModule } from './sandbox-routing.module';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { PostsListComponent } from './pages/posts-list/posts-list.component';


@NgModule({
  declarations: [
    NewPostComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    SandboxRoutingModule
  ]
})
export class SandboxModule { }

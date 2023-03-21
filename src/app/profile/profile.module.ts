import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

import {PostModule} from '../post/post.module';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProfilePostsComponent} from './pages/profile-posts/profile-posts.component';
import {ProfileRoutingModule} from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent, ProfilePostsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    PostModule,
  ],
})
export class ProfileModule {}

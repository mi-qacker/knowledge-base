import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {ProfileComponent} from './pages/profile/profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import { ProfilePostsComponent } from './pages/profile-posts/profile-posts.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePostsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
  ],
})
export class ProfileModule {}

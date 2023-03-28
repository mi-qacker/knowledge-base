import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { PostModule } from '../../widgets/post/post.module';
import { ProfileModeratorPageComponent } from './profile-moderator-page.component';
import { ProfileModeratorPageRoutingModule } from './profile-moderator-page-routing.module';

@NgModule({
  declarations: [ProfileModeratorPageComponent],
  imports: [
    CommonModule,
    ProfileModeratorPageRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PostModule,
  ],
})
export class ProfileModeratorPageModule { }

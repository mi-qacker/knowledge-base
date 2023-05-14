import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

import {PostModule} from '../../widgets/post/post.module';
import {ProfilePageComponent} from './profile-page.component';
import {ProfilePageRoutingModule} from './profile-page-routing.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    PostModule,
  ],
})
export default class ProfilePageModule {}

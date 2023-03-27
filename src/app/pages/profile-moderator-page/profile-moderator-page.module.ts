/* eslint-disable simple-import-sort/imports */
/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ProfileModeratorPageComponent } from './profile-moderator-page.component';
import { ProfileModeratorPageRoutingModule } from './profile-moderator-page-routing.module';
import { PostModule } from "../../widgets/post/post.module";

@NgModule({
  declarations: [ProfileModeratorPageComponent],
  imports: [
    CommonModule,
    ProfileModeratorPageRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PostModule
  ]
})
export class ProfileModeratorPageModule { }

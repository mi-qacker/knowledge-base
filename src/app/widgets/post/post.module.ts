import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

import {PostStartPipe} from './pipes/post-start/post-start.pipe';
import {PostCardComponent} from './ui/post-card/post-card.component';

@NgModule({
  declarations: [PostCardComponent, PostStartPipe],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [PostCardComponent],
})
export class PostModule {}

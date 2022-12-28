import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {PostCardComponent} from './components/post-card/post-card.component';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {PostStartPipe} from './pipes/post-start/post-start.pipe';
import {PostRoutingModule} from './post-routing.module';

@NgModule({
  declarations: [PostPageComponent, PostCardComponent, PostStartPipe],
  imports: [CommonModule, PostRoutingModule, MatButtonModule, MatIconModule],
  exports: [PostCardComponent],
})
export class PostModule {}

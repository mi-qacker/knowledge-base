import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';

import {PostModule} from '../../widgets/post/post.module';
import {ModerationPageComponent} from './moderation-page/moderation-page.component';
import {ModerationPostComponent} from './moderation-post/moderation-post.component';
import {ModerationRoutingModule} from './moderation-routing.module';

@NgModule({
  declarations: [ModerationPageComponent, ModerationPostComponent],
  imports: [CommonModule, ModerationRoutingModule, MatListModule, PostModule],
})
export class ModerationModule {}

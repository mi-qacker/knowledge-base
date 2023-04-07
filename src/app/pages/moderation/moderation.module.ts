import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';

import {PostModule} from '../../widgets/post/post.module';
import {ModerationPageComponent} from './moderation-page/moderation-page.component';
import {ModerationRoutingModule} from './moderation-routing.module';

@NgModule({
  declarations: [ModerationPageComponent],
  imports: [CommonModule, ModerationRoutingModule, MatListModule, PostModule],
})
export class ModerationModule {}

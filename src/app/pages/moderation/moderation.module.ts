import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ModerationPageComponent} from './moderation-page/moderation-page.component';
import {ModerationRoutingModule} from './moderation-routing.module';

@NgModule({
  declarations: [ModerationPageComponent],
  imports: [CommonModule, ModerationRoutingModule],
})
export class ModerationModule {}

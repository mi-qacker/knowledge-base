import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PostPageComponent} from './pages/post-page/post-page.component';
import {PostRoutingModule} from './post-routing.module';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostRoutingModule],
})
export class PostModule {}

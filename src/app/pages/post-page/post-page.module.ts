import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PostPageComponent} from './post-page.component';
import {PostPageRoutingModule} from './post-page-routing.module';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostPageRoutingModule],
})
export class PostPageModule {}

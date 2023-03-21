import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PostPageComponent} from './post-page.component';

const routes: Routes = [{path: ':id', component: PostPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}

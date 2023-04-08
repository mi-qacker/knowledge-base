import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModerationPageComponent} from './moderation-page/moderation-page.component';
import {ModerationPostComponent} from './moderation-post/moderation-post.component';

const routes: Routes = [
  {path: '', component: ModerationPageComponent},
  {path: ':id', component: ModerationPostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModerationRoutingModule {}

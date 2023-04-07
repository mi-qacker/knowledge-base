import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModerationPageComponent} from './moderation-page/moderation-page.component';

const routes: Routes = [{path: '', component: ModerationPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModerationRoutingModule {}

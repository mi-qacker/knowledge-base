import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileModeratorPageComponent} from './profile-moderator-page.component';

const routes: Routes = [
  {path: ':id', component: ProfileModeratorPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileModeratorPageRoutingModule {}

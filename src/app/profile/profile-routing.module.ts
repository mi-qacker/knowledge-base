import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileComponent} from './pages/profile/profile.component';
import {ProfilePostsComponent} from './pages/profile-posts/profile-posts.component';

const routes: Routes = [
  {path: ':id', component: ProfileComponent},
  {path: ':id/posts', component: ProfilePostsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

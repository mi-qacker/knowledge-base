import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ProfileModeratorPageComponent} from './profile-moderator-page.component';
import {ProfileModeratorPageRoutingModule} from './profile-moderator-page-routing.module';

@NgModule({
  declarations: [ProfileModeratorPageComponent],
  imports: [CommonModule, ProfileModeratorPageRoutingModule],
})
export class ProfileModeratorPageModule {}

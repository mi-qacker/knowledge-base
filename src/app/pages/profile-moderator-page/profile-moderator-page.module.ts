import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from 'app/shared/shared.module';

import {ProfileModeratorPageComponent} from './profile-moderator-page.component';
import {ProfileModeratorPageRoutingModule} from './profile-moderator-page-routing.module';

@NgModule({
  declarations: [ProfileModeratorPageComponent],
  imports: [
    SharedModule,
    ProfileModeratorPageRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export default class ProfileModeratorPageModule {}

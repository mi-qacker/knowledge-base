import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {LoggedUserService} from './logged-user-service/logged-user.service';

@NgModule({
  imports: [CommonModule],
  providers: [LoggedUserService],
})
export class AuthModule {}

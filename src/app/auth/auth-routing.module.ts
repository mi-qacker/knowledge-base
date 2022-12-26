import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NonLoginGuard} from './guards/non-login/non-login.guard';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NonLoginGuard]},
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonLoginGuard],
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

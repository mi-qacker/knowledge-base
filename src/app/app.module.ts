import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './services/auth/auth.module';
import {HttpModule} from './services/http/http.module';
import {SharedModule} from './shared/shared.module';
import {NavbarComponent} from './widgets/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AuthModule,
    BrowserAnimationsModule,
    SharedModule,
    NavbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

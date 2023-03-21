import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AuthHttpService} from './auth-http/auth-http.service';
import {CategoryHttpService} from './category-http/category-http.service';
import {KnowledgeUsersHttpService} from './knowledge-users-http/knowledge-users-http.service';
import {PostHttpService} from './post-http/post-http.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthHttpService,
    CategoryHttpService,
    KnowledgeUsersHttpService,
    PostHttpService,
  ],
})
export class HttpModule {}

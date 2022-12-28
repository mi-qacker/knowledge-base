import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../auth/services/logged-user/logged-user.service';
import {HttpModule} from '../http/http.module';
import {PostHttpService} from '../http/services/post-http/post-http.service';
import {PostModule} from '../post/post.module';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, HttpModule, PostModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  posts$ = this.postHttpService.getPosts(true);
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));
  constructor(
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService
  ) {}
}

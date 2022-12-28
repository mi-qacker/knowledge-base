import {Component} from '@angular/core';
import {map} from 'rxjs';

import {LoggedUserService} from '../../../auth/services/logged-user/logged-user.service';
import {PostHttpService} from '../../../http/services/post-http/post-http.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts$ = this.postHttpService.getPosts(false);
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));
  constructor(
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService
  ) {}
}

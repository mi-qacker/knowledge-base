import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs';
import {IPost} from 'src/app/http/services/post-http/post.interface';

import {LoggedUserService} from '../../../auth/services/logged-user/logged-user.service';
import {PostHttpService} from '../../../http/services/post-http/post-http.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({opacity: 0}),
            stagger(100, [animate('0.25s', style({opacity: 1}))]),
          ],
          {optional: true}
        ),
      ]),
    ]),
  ],
})
export class PostsListComponent implements OnInit {
  posts: IPost[] = [];
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));
  constructor(
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.postHttpService
      .getPosts(false)
      .subscribe(posts => posts.forEach(post => this.posts.push(post)));
  }
}

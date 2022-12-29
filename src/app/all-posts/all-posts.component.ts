import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../auth/services/logged-user/logged-user.service';
import {HttpModule} from '../http/http.module';
import {IPost} from '../http/services/post-http/post.interface';
import {PostHttpService} from '../http/services/post-http/post-http.service';
import {PostModule} from '../post/post.module';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, HttpModule, PostModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
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
export class AllPostsComponent implements OnInit {
  posts: IPost[] = [];
  userId$ = this.loggedUserService.user$.pipe(map(user => user?._id));

  constructor(
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.postHttpService.getPosts(true).subscribe(posts => {
      posts.forEach(post => this.posts.push(post));
    });
  }
}

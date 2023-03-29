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
import {MatListModule} from '@angular/material/list';
import {map} from 'rxjs/operators';

import {LoggedUserService} from '../../services/auth/logged-user-service/logged-user.service';
import {IPost} from '../../services/http/post-http/post.interface';
import {PostHttpService} from '../../services/http/post-http/post-http.service';
import {PostModule} from '../../widgets/post/post.module';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, PostModule, MatListModule],
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
  userId$ = this.loggedUserService.user$.pipe(map(user => user?.user._id));

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

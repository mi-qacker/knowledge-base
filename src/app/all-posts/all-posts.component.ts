import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {HttpModule} from '../http/http.module';
import {PostHttpService} from '../http/services/post-http/post-http.service';

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, HttpModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  posts$ = this.postHttpService.getPosts(true);
  constructor(private postHttpService: PostHttpService) {}
}

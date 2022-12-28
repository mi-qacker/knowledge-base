import {Component, Input, OnInit} from '@angular/core';

import {IPost} from '../../../http/services/post-http/post.interface';
import {PostHttpService} from '../../../http/services/post-http/post-http.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() public post!: IPost;
  @Input() public userId?: string | null;
  likeOwner = false;
  constructor(private postHttpService: PostHttpService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.likeOwner = this.post.likes.includes(this.userId);
    }
  }

  likePost() {
    const userId: string = this.userId!;
    const request = this.likeOwner
      ? this.postHttpService.removeLike(this.post, userId)
      : this.postHttpService.addLike(this.post, userId);

    request.subscribe(post => {
      this.likeOwner = !this.likeOwner;
      this.post = post;
    });
  }
}

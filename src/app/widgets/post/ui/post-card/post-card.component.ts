import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from 'app/services/http/post-http/post.interface';
import {PostHttpService} from 'app/services/http/post-http/post-http.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() public post!: IPost;
  @Input() public userId?: string | null;
  @Input() public routePath: 'post' | 'moderation' = 'post';
  @Input() public owner = false;
  @Output() public delete = new EventEmitter<string>();
  likeOwner = false;

  constructor(private postHttpService: PostHttpService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.likeOwner = this.post.likes.includes(this.userId);
    }
  }

  likePost() {
    const userId = this.userId;
    if (!userId) return;
    const request = this.likeOwner
      ? this.postHttpService.removeLike(this.post, userId)
      : this.postHttpService.addLike(this.post, userId);

    request.subscribe(post => {
      this.likeOwner = !this.likeOwner;
      this.post = post;
    });
  }

  deletePost() {
    this.postHttpService.deletePost(this.post.id).subscribe(() => {
      this.delete.emit(this.post.id);
    });
  }
}

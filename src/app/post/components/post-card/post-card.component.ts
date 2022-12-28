import {Component, Input, OnInit} from '@angular/core';
import {IPost} from 'src/app/http/services/post-http/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() public post!: IPost;
  @Input() public userId?: string | null;
  likeOwner = false;
  constructor() {}

  ngOnInit(): void {
    if (this.userId) {
      this.likeOwner = this.post.likes.includes(this.userId);
    }
  }
}

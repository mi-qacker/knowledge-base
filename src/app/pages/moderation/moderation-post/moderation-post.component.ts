import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import {editorjsConfig} from 'app/editorjs/configs/editor-readonly.config';
import {IPost} from 'app/services/http/post-http/post.interface';
import {PostHttpService} from 'app/services/http/post-http/post-http.service';

@Component({
  selector: 'app-moderation-post',
  templateUrl: './moderation-post.component.html',
  styleUrls: ['./moderation-post.component.scss'],
})
export class ModerationPostComponent implements OnInit {
  editor!: EditorJS;
  post?: IPost;
  postId!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postHttpService: PostHttpService
  ) {
    this.route.params.subscribe(({id}) => {
      this.postId = id;
    });
  }

  ngOnInit(): void {
    this.postHttpService.getPostById(this.postId).subscribe(post => {
      this.post = post;
      this.editor = new EditorJS({...editorjsConfig, data: post.data});
    });
  }

  applyPost() {
    this.postHttpService
      .setModeration(this.postId, true)
      .subscribe(async () => {
        await this.router.navigate(['/post', this.postId]);
      });
  }

  cancelPost() {
    this.postHttpService.deletePost(this.postId).subscribe(async () => {
      await this.router.navigate(['/moderation']);
    });
  }
}

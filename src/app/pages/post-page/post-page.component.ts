import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import {editorjsConfig} from 'assets/editorjs-configs/editor-readonly.config';

import {IPost} from '../../services/http/post-http/post.interface';
import {PostHttpService} from '../../services/http/post-http/post-http.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  editor!: EditorJS;
  post?: IPost;
  postId!: string;

  constructor(
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
}

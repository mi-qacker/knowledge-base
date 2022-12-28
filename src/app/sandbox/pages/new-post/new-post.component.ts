import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import {EMPTY, switchMap} from 'rxjs';
import {IPost} from 'src/app/http/services/post-http/post.interface';

import {LoggedUserService} from '../../../auth/services/logged-user/logged-user.service';
import {PostHttpService} from '../../../http/services/post-http/post-http.service';
import {editorjsConfig} from './editor.config';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  header: string = '';
  editor!: EditorJS;

  constructor(
    private router: Router,
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService
  ) {}
  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig);
  }

  async saveEditorData() {
    const outputData: any = await this.editor.save();
    this.loggedUserService.user$
      .pipe(
        switchMap(user => {
          if (!user) return EMPTY;
          const newPost: Omit<IPost, 'id'> = {
            userId: user._id,
            moderation: false,
            title: this.header,
            data: outputData,
            likes: [user._id],
          };
          return this.postHttpService.postNewPost(newPost);
        })
      )
      .subscribe(async () => {
        await this.router.navigate(['/sandbox']);
      });
  }
}

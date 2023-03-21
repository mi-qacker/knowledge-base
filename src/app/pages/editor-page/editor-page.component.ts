import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import {EMPTY, switchMap} from 'rxjs';

import {LoggedUserService} from '../../auth/logged-user-service/logged-user.service';
import {IPost} from '../../http/post-http/post.interface';
import {PostHttpService} from '../../http/post-http/post-http.service';
import {editorjsConfig} from './editor.config';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
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
            userId: user.user._id,
            moderation: false,
            title: this.header,
            data: outputData,
            likes: [user.user._id],
          };
          return this.postHttpService.postNewPost(newPost);
        })
      )
      .subscribe(async () => {
        await this.router.navigate(['/']);
      });
  }
}

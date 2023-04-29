import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import EditorJS from '@editorjs/editorjs';
import {editorjsConfig} from 'app/editorjs/configs/editor.config';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {ICategory} from 'app/services/http/category-http/category';
import {CategoryHttpService} from 'app/services/http/category-http/category-http.service';
import {IPostCreateDto} from 'app/services/http/post-http/post.interface';
import {PostHttpService} from 'app/services/http/post-http/post-http.service';
import {EMPTY, Observable, switchMap} from 'rxjs';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss'],
})
export class EditorPageComponent implements OnInit {
  editor!: EditorJS;
  categories$: Observable<ICategory[]>;
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private postHttpService: PostHttpService,
    private loggedUserService: LoggedUserService,
    private categoryHttpService: CategoryHttpService,
    private fb: FormBuilder
  ) {
    this.categories$ = this.categoryHttpService.getCategories();
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editor = new EditorJS(editorjsConfig);
  }

  async saveEditorData() {
    const outputData: any = await this.editor.save();
    this.loggedUserService.user$
      .pipe(
        switchMap(user => {
          if (!user) return EMPTY;
          const {
            value: {title, category},
          } = this.formGroup;
          const newPost: IPostCreateDto = {
            userId: user._id,
            title,
            data: outputData,
            category,
          };
          return this.postHttpService.postNewPost(newPost);
        })
      )
      .subscribe(async () => {
        await this.router.navigate(['/']);
      });
  }
}

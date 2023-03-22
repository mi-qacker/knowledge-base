import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

import {AuthHttpService} from '../../services/http/auth-http/auth-http.service';
import {IPost} from '../../services/http/post-http/post.interface';
import {PostHttpService} from '../../services/http/post-http/post-http.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user$ = this.authHttpService.getLoggedUser().pipe(shareReplay(1));
  posts$!: Observable<IPost[]>;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private authHttpService: AuthHttpService,
    private postHttpService: PostHttpService
  ) {
    this.route.params.subscribe(({id}) => {
      this.userId = id;
    });
  }

  ngOnInit(): void {
    this.posts$ = this.postHttpService.getPostByUserId(this.userId);
  }
}

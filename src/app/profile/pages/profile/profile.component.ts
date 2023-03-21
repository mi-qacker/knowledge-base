import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthHttpService} from 'app/http/auth-http/auth-http.service';
import {IPost} from 'app/http/post-http/post.interface';
import {PostHttpService} from 'app/http/post-http/post-http.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

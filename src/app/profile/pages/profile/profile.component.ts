import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IPost} from 'app/http/services/post-http/post.interface';
import {PostHttpService} from 'app/http/services/post-http/post-http.service';
import {ProfileHttpService} from 'app/http/services/profile-http/profile-http.service';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.profileHttpService.getUserInfo().pipe(shareReplay(1));
  posts$!: Observable<IPost[]>;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private profileHttpService: ProfileHttpService,
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

import {Component, OnInit} from '@angular/core';

import {IUser} from '../../interfaces/user.interface';
import {ProfileHttpService} from '../../services/profile-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null;
  constructor(private profileHttpService: ProfileHttpService) {}

  ngOnInit(): void {
    this.profileHttpService.getUserInfo().subscribe(user => {
      this.user = user;
    });
  }
}

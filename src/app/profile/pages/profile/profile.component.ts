import { Component, OnInit } from '@angular/core';
import { ProfileHttpService } from '../../services/profile-http.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser | null = null;
  constructor(private profileHttpService: ProfileHttpService) {}

  ngOnInit(): void {
    this.profileHttpService.getUserInfo().subscribe((user) => {
      this.user = user;
    });
  }
}

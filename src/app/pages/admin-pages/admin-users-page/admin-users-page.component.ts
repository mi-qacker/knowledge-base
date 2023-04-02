import {Component, OnInit} from '@angular/core';

import {AdminUsersService} from './admin-users.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss'],
})
export class AdminUsersPageComponent implements OnInit {
  users$ = this.adminUsersService.knowledgeUsers$;
  constructor(private adminUsersService: AdminUsersService) {}

  ngOnInit() {
    this.adminUsersService.loadUsers();
  }
}

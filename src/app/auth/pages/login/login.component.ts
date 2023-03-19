import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthHttpService} from 'app/http/auth-http/auth-http.service';

import {ILoginUserDto} from '../../../http/auth-http/user.interface';
import {LoggedUserService} from '../../services/logged-user/logged-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  loginUser() {
    const loginUserDto: ILoginUserDto = this.loginForm.value;
    this.authHttpService.loginUser(loginUserDto).subscribe(async user => {
      this.loggedUserService.loginUser(user);
      await this.router.navigateByUrl('/');
    });
  }
}

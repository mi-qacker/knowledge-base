import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Router, RouterModule} from '@angular/router';

import {LoggedUserService} from '../../auth/services/logged-user/logged-user.service';
import {AuthHttpService} from '../../http/auth-http/auth-http.service';
import {ILoginUserDto} from '../../http/auth-http/user.interface';
import {HttpModule} from '../../http/http.module';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
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

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
import {IRegisterUserDto} from '../../http/auth-http/user.interface';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  registerForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService,
    private loggedUserService: LoggedUserService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      login: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z]+[a-zA-Z\d]*/),
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&\[\]])[\w@$!%*#?&\[\]]+/g
          ),
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
  }
  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
  registerUser() {
    const registerUserDto: IRegisterUserDto = this.registerForm.value;
    this.authHttpService.registerUser(registerUserDto).subscribe(async user => {
      this.loggedUserService.loginUser(user);
      await this.router.navigateByUrl('/');
    });
  }
}

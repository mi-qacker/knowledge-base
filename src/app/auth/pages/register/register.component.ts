import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {RegisterUserDto} from '../../models/user.model';
import {AuthHttpService} from '../../services/auth-http/auth-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authHttpService: AuthHttpService
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
    const registerUserDto: RegisterUserDto = this.registerForm.value;
    this.authHttpService.registerUser(registerUserDto).subscribe(async () => {
      await this.router.navigateByUrl('/');
    });
  }
}

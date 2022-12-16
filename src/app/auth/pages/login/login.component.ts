import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserDto } from '../../models/user.model';
import { AuthHttpService } from '../../services/auth-http.service';

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
    private authHttpService: AuthHttpService
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
    const loginUserDto: LoginUserDto = this.loginForm.value;
    this.authHttpService.loginUser(loginUserDto).subscribe(async () => {
      await this.router.navigateByUrl('/');
    });
  }
}

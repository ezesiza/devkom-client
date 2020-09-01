import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  auth$: Observable<void>;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    const loginCredentials = {
      password: form.value.password,
      email: form.value.email,
    };

  }
}

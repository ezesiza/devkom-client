import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const userData = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      avatar: form.value.avatar,
      date: form.value.date,
    };
    this.authService.registerUser(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.password,
      form.value.avatar,
      form.value.date
    );
    console.log(form.value);
  }
}

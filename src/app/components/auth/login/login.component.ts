import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as authReducer from "src/app/reducers/authReducer";

import { AuthData } from "../auth-data.model";
import { Observable } from "rxjs";
import * as authAction from "src/app/actions/auth.actions";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  auth$: Observable<void>;

  constructor(
    private store: Store<authReducer.AuthState>,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.store.pipe(select(authReducer.getLoginUser));
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

    // this.store.dispatch(new authAction.LoginUser(loginCredentials));
  }
}

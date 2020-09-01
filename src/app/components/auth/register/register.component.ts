import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { ActionTypes } from "../../../actions/action.types";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import * as authReducer from "src/app/reducers/authReducer";
import * as authAction from "src/app/actions/auth.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(
    private store: Store<authReducer.AuthState>,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    //this.store.dispatch({ type: '', payload: form.value });
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
    //this.store.dispatch(new authAction.RegisterUser(userData));
  }
}

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { ActionTypes } from "src/app/actions/action.types";
import {
  mergeMap,
  map,
  catchError,
  tap,
  exhaustMap,
  switchMap,
} from "rxjs/operators";

import * as AuthActions from "../../actions/auth.actions";
import { AuthData, RegisterData } from "./auth-data.model";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  loginUser$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LOGIN_USER),
    map((action: AuthActions.LoginUser) => action.payload),
    exhaustMap((user: AuthData) =>
      this.authService.login(user.password, user.email).pipe(
        map((userData) => {
          return new AuthActions.LoginUser(userData);
        }),
        catchError((err) => of(new AuthActions.LoginUserFail(err)))
      )
    )
  );
  /* @Effect()*/
  // registerUser$: Observable<Action> = this.actions$.pipe(
  //   ofType(ActionTypes.REGISTER_USER),
  //   map((action: AuthActions.RegisterUser) => action.payload),
  //   exhaustMap((user: RegisterData) =>
  //     this.authService
  //       .registerUser(
  //         user.username,
  //         user.email,
  //         user.password,
  //         user.avatar,
  //         user.date
  //       )
  //       .pipe(
  //         map((userData) => {
  //           return new AuthActions.RegisterUser(userData);
  //         }),
  //         catchError((err) => of(new AuthActions.RegisterUserFail(err)))
  //       )
  //   )
  // );
}

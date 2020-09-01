import { ActionTypes } from './action.types';
import { Action } from '@ngrx/store';
import { AuthData } from '../components/auth/auth-data.model';


export class LoginUser implements Action {
    readonly type = ActionTypes.LOGIN_USER;

    constructor(public payload: AuthData) { }
}
export class RegisterUser implements Action {
    readonly type = ActionTypes.REGISTER_USER;

    constructor(public payload: AuthData) { }
}

export class LoginSuccessUser implements Action {
    readonly type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: AuthData) { }
}

export class LoginUserFail implements Action {
    readonly type = ActionTypes.CREATE_USER_FAILED;

    constructor(public payload: string) { }
}
export class RegisterUserFail implements Action {
    readonly type = ActionTypes.CREATE_USER_FAILED;

    constructor(public payload: string) { }
}



export type AuthActions =
    | LoginUser
    | LoginSuccessUser
    | RegisterUser;
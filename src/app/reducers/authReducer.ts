//import isEmpty from "../validation/is-empty";
import { ActionTypes } from "../actions/action.types";
import { AuthActions } from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
    user: {};
}

const initialState: AuthState = {
    user: {}
};
const getUserFeatureState =
    createFeatureSelector<AuthState>("auth");

export const getLoginUser = createSelector(getUserFeatureState, (state) => state);

export function reducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
            };
        case ActionTypes.REGISTER_USER:
            {
                return { ...state };
            }
        default:
            return state;
    }
}

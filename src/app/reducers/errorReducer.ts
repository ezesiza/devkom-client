import { ActionTypes } from "../actions/action.types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_ERRORS:
            return action.payload;
        case ActionTypes.CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}

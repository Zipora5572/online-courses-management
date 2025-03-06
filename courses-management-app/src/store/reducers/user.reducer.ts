import { Action, createReducer, on } from "@ngrx/store";
import {  UserState, initialUserState } from "../state";
import { addUser, deleteUser, updateUser } from "../actions/user.action";


const _userReducer = createReducer(
    initialUserState ,
    on(addUser, (state, { user }) => ({
        ...state,
        Users: [...state.users, user]
    })),
    on(updateUser, (state, { user }) => ({
        ...state,
        Users: state.users.map(s => s.id === user.id ? user : s)
    })),
    on(deleteUser, (state, { id }) => ({
        ...state,
        Users: state.users.filter(user => user.id !== id)
    }))
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}

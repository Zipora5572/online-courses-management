import { createReducer, on } from '@ngrx/store';
import { loginUser, loginUserSuccess, loginUserFailure, logoutUser, loadUser, loadUserSuccess, loadUserFailure, registerUserSuccess, registerUserFailure } from '../actions/user.action';
import { User } from '../../models/user.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
    error: null,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
 
  on(registerUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
  ,on(logoutUser, (state) => ({
    ...state,
    user: null,
  })),
  on(loadUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user: user,
    error: null,
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

  
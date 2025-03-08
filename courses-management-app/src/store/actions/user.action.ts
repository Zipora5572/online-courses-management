
import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


export const loginUser = createAction('[User] Login User',  props<{ email: string; password: string }>());
export const loginUserSuccess = createAction('[User] Login User Success',  props<{ user:User }>());
export const loginUserFailure = createAction('[User] Login User Failure',  props<{ error:any }>());
export const logoutUser = createAction('[User] Logout User');
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());
export const registerUser = createAction('[User] Register User', props<{ name: string; email: string; password: string; role: string }>());
export const registerUserSuccess = createAction('[User] Register User Success', props<{ user: User }>());
export const registerUserFailure = createAction('[User] Register User Failure', props<{ error: any }>());
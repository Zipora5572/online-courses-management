import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loginUser, loginUserFailure, loginUserSuccess, loadUser, loadUserSuccess, loadUserFailure, registerUser, registerUserSuccess, registerUserFailure } from '../actions/user.action';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { UserState } from '../reducers/user.reducer'; // Adjust the import path as necessary
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<{ user: UserState }> // Specify the type of the state
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => loginUserSuccess({ user })), // Assuming user is of type User
          catchError(error => of(loginUserFailure({ error })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap(action =>
        this.authService.register(action.name, action.email, action.password, action.role).pipe(
          map(user => registerUserSuccess({ user })), // Dispatch success action
          catchError(error => of(registerUserFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      withLatestFrom(this.store.select(state => state.user.user)), // Get the user state
      switchMap(([action, user]) => {
        if (user && user.id) { // Check if user exists and has an ID
          return this.userService.getUserById(user.id).pipe(
            map(userData => loadUserSuccess({ user: userData })),
            catchError(error => of(loadUserFailure({ error })))
          );
        } else {
          return of(loadUserFailure({ error: 'User ID not found' })); // Handle case where user ID is not available
        }
      })
    )
  );
}

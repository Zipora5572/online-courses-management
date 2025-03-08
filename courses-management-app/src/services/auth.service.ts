import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { loginUserSuccess, logoutUser, registerUserFailure, registerUserSuccess } from '../store/actions/user.action';

interface AuthResponse {
  token: string; 
  // user: User;
  role: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); 
  private roleSubject = new BehaviorSubject<string>(this.getRole()); 

  constructor(private http: HttpClient, private userService: UserService, private store: Store) {}

  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      tap(response => {
        if (response) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('userId', response.userId);
          }
          this.store.dispatch(registerUserSuccess({ user: response.user })); // Dispatch success action
        }
      }),
      catchError(error => {
        this.store.dispatch(registerUserFailure({ error })); // Dispatch failure action
        return of(error); // Return the error for further handling
      })
    );
}
  
  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body).pipe(
      tap(response => {
        if (response) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('userId', response.userId);
          }
          this.loggedInSubject.next(true);
        }
      }),
      switchMap(response => {
      return this.userService.getUserById(Number(response.userId)).pipe(
        tap(user => {
          this.store.dispatch(loginUserSuccess({ user: user }));
        })
      );
      })
    );
  }
  
  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      this.loggedInSubject.next(false);
    }
   
    this.store.dispatch(logoutUser());
  }
 
  isLoggedIn(): boolean {
    const loggedIn = typeof window !== 'undefined' ? !!this.getToken() : false;
    return loggedIn; 
  }

  getRole(): string {
    if (typeof window !== 'undefined') {
      const userId = sessionStorage.getItem('userId');
      // Implement role retrieval logic if necessary
    }
    return '';  // default role is 'guest'
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('authToken');
    }
    return null; 
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}

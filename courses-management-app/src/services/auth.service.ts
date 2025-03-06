import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string; 
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); 
  private roleSubject = new BehaviorSubject<string>(this.getRole()); 

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      tap(response => {
        if (response) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('userId', response.userId);
          }
        }
      })
    );
  }
  
  login(email: string, password: string): Observable<AuthResponse> {
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
      })
    );
  }
  
  logout() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      this.loggedInSubject.next(false);
    }
  }
 
  isLoggedIn(): boolean {
    const loggedIn = typeof window !== 'undefined' ? !!this.getToken() : false;

    return loggedIn; 
  }
  getRole(): string {
    if (typeof window!== 'undefined') {
      const userId=sessionStorage.getItem('userId');
      
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

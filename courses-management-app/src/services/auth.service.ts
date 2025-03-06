import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string; 
  userId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; 
  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, role: string): Observable<any> {
    const body = { name, email, password, role };
    return this.http.post<any>(`${this.apiUrl}/register`, body).pipe(
      tap(response => {
          if(response) {

            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('userId', response.userId);
          } 
        }))
  }

  
  login(email: string, password: string): Observable<AuthResponse> {
    const body = { email, password };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body).pipe(
        tap(response => {
            if(response) {
              sessionStorage.setItem('authToken', response.token);
              sessionStorage.setItem('userId', response.userId);
            } 
          
        })
    );
}

  
  
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }

  logout() {
    
    sessionStorage.removeItem('authToken');
  }
}

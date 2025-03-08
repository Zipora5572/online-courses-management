import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; 
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable(); 

  constructor(private http: HttpClient) {
    
    
  }
  

  getUserById(id: number): Observable<User> {
    
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: User): void {
    this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    ).subscribe(newUser => {
      const currentUsers = this.usersSubject.value;
      this.usersSubject.next([...currentUsers, newUser]); 
    });
  }

  updateUser(user: User): void {
    this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    ).subscribe(updatedUser => {
      const currentUsers = this.usersSubject.value.map(u => u.id === updatedUser.id ? updatedUser : u);
      this.usersSubject.next(currentUsers); 
    });
  }

  deleteUser(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    ).subscribe(() => {
      const currentUsers = this.usersSubject.value.filter(u => u.id !== id);
      this.usersSubject.next(currentUsers); 
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error', error);
    
     let errorMessage = 'error: ' + error.error.message;
    // if (error.error instanceof ErrorEvent) {
    //     // זה קוד שמריץ בצד הלקוח
    //     errorMessage = `שגיאה: ${error.error.message}`;
    // } else {
    //     // זה קוד שמריץ בצד השרת
    //     errorMessage = `שגיאה קוד: ${error.status}, ${error.message}`;
    // }
    // console.error(errorMessage); // הדפסת השגיאה לקונסול
     return throwError(errorMessage); // החזרת השגיאה
}


}

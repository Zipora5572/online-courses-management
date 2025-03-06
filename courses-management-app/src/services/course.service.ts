import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { cp } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private apiUrl = 'http://localhost:3000/api/courses'; 

  constructor(private http: HttpClient) {}

  
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, {...course,teacherId:sessionStorage.getItem('userId')}).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(course: Course): Observable<Course> {
   
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  enrollInCourse(courseId: string) {
    const userId = sessionStorage.getItem('userId'); 
   
  
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, 
    ).pipe(
      catchError(this.handleError)
    );
    
  }
  unEnrollInCourse(courseId: string) {
    const userId = sessionStorage.getItem('userId'); 
   
  
    return this.http.post(`${this.apiUrl}/${courseId}/unenroll`, { userId }, 
    ).pipe(
      catchError(this.handleError)
    );
    
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
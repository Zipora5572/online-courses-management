import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private apiUrl = 'http://localhost:3000/api/courses'; 

  constructor(private http: HttpClient) {}

  
  getCourses(): Observable<Course[]> {
    if (typeof window !== 'undefined') {
      if(sessionStorage.getItem('authToken') != null) 
        return this.http.get<Course[]>(this.apiUrl).pipe(
          catchError(this.handleError)
        );
        else return throwError('User not logged in');
   }
    else return throwError('User not logged in');
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getCoursesByStudentId(studentId: number|undefined): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/student/${studentId}`).pipe(
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
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }).pipe(
   
      catchError(this.handleError)
    );
  }
  unEnrollInCourse(courseId: string) {
    const userId = sessionStorage.getItem('userId'); 
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } }).pipe(
   
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
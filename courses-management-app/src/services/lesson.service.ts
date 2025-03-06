import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Lesson } from '../models/lesson.model'

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses'

  constructor(private http: HttpClient) {}

  getLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).pipe(
      catchError(this.handleError)
    )
  }

  getLessonById(courseId: number, id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  addLesson(courseId: number, lesson: Lesson): Observable<{ message: string, lessonId: number }> {
    return this.http.post<{ message: string, lessonId: number }>(`${this.apiUrl}/${courseId}/lessons`, lesson).pipe(
      catchError(this.handleError)
    )
    
  }

  updateLesson(courseId: number, lesson: Lesson): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${courseId}/lessons/${lesson.id}`, lesson).pipe(
      catchError(this.handleError)
    )
  }

  deleteLesson(courseId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'שגיאה לא ידועה'
    if (error.error instanceof ErrorEvent) {
      errorMessage = `שגיאה: ${error.error.message}`
    } else {
      errorMessage = `שגיאה קוד: ${error.status}, ${error.message}`
    }
    return throwError(errorMessage)
  }
}

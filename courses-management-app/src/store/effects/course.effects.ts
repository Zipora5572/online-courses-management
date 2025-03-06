import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure, addCourse, updateCourse, deleteCourse, enrollInCourse, enrollInCourseSuccess, enrollInCourseFailure, unenrollInCourseSuccess, unenrollInCourseFailure } from '../actions/course.actions';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => loadCoursesSuccess({ courses })),
          catchError(error => {
            //console.error('Error loading courses:', error);
            return of(loadCoursesFailure({ error }));
          })
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCourse),
      mergeMap(action =>
        this.courseService.addCourse(action.course).pipe(
          map(response => {
        
            return loadCourses();
          }),
          catchError(error => {
         //   console.error('Error adding course:', error);
            return of(loadCoursesFailure({ error }));
          })
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCourse),
      mergeMap(action =>
        this.courseService.updateCourse(action.course).pipe(
          map(() => {
           
            return loadCourses();
          }),
          catchError(error => {
            //console.error('Error updating course:', error);
            return of(loadCoursesFailure({ error }));
          })
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(action =>
        this.courseService.deleteCourse(action.courseId).pipe(
          map(() => {

            return loadCourses();
          }),
          catchError(error => {
           // console.error('Error deleting course:', error);
            return of(loadCoursesFailure({ error }));
          })
        )
      )
    )
  );
  enrollInCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrollInCourse),
      mergeMap(action =>
        this.courseService.enrollInCourse(action.courseId.toString()).pipe(
          map(() => enrollInCourseSuccess({ courseId: action.courseId })),
          catchError(error => of(enrollInCourseFailure({ error })))
        )
      )
    )
  );
  unenrollInCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(enrollInCourse),
      mergeMap(action =>
        this.courseService.unEnrollInCourse(action.courseId.toString()).pipe(
          map(() => unenrollInCourseSuccess({ courseId: action.courseId })),
          catchError(error => of(unenrollInCourseFailure({ error })))
        )
      )
    )
  );
}
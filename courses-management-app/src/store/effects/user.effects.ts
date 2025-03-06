import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { getUserById } from '../actions/user.action';
// import { loadCourses, loadCoursesSuccess, loadCoursesFailure, addCourse, updateCourse, deleteCourse, enrollInCourse, enrollInCourseSuccess, enrollInCourseFailure, unenrollInCourseSuccess, unenrollInCourseFailure } from '../actions/course.actions';

@Injectable()
export class UserEffect {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  
  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserById),
      mergeMap(action =>
        this.userService.getUserById(action.userId).pipe(
          map(() => getUserById({ userId: action.userId }))
      )
    )
  ))
}
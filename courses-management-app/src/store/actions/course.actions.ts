import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const loadCourses = createAction('[Course List] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course List] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: any }>()
);

export const addCourse = createAction(
  '[Course List] Add Course',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  '[Course List] Update Course',
  props<{ course: Course }>()
);

export const deleteCourse = createAction(
  '[Course List] Delete Course',
  props<{ courseId: number }>()
);


export const enrollInCourse = createAction(
  '[Course] Enroll In Course',
  props<{ courseId: number }>()
);

export const enrollInCourseSuccess = createAction(
  '[Course] Enroll In Course Success',
  props<{ courseId: number }>()
);

export const enrollInCourseFailure = createAction(
  '[Course] Enroll In Course Failure',
  props<{ error: any }>()
);

export const unenrollInCourse = createAction(
  '[Course] unEnroll In Course',
  props<{ courseId: number }>()
);

export const unenrollInCourseSuccess = createAction(
  '[Course] unEnroll In Course Success',
  props<{ courseId: number }>()
);

export const unenrollInCourseFailure = createAction(
  '[Course] unEnroll In Course Failure',
  props<{ error: any }>()
);
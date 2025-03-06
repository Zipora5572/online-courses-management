import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../reducers/course.reducers';

export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
)

export const selectLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
)

export const selectCourseById = (courseId: number) => createSelector(
  selectCourseState,
  (state: CourseState) => state.courses.find(course => course.id == courseId) 
)


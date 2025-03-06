import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from '../actions/course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CourseActions.loadCourses, state => ({ ...state, loading: true })),
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CourseActions.addCourse, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course]
  })),
  on(CourseActions.updateCourse, (state, { course }) => ({
    ...state,
    courses: state.courses.map(c => (c.id === course.id ? course : c))
  })),
  on(CourseActions.deleteCourse, (state, { courseId }) => ({
    ...state,
    courses: state.courses.filter(c => c.id !== courseId)
  })),
  on(CourseActions.deleteCourse, (state, { courseId }) => ({
    ...state,
    error: null,
  })),
  on(CourseActions.enrollInCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CourseActions.unenrollInCourseFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

 
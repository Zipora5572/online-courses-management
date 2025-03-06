import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from '../state';

export const selectLessonState = createFeatureSelector<LessonState>('lessons');

export const selectLessonsByCourseId = (courseId: number) => 
  createSelector(
    selectLessonState, 
    (state:LessonState) => state.lessons.filter(lesson => lesson.courseId == courseId)
  );

export const selectAllLessons = createSelector(
  selectLessonState,
  (state: LessonState) => state.lessons
);

export const selectLoading = createSelector(
  selectLessonState,
  (state: LessonState) => state.loading
);

export const selectError = createSelector(
  selectLessonState,
  (state: LessonState) => state.error
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from '../reducers/course.reducers';
import { UserState } from '../state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = (userId: number) => createSelector(
    selectUserState,
  (state: UserState) => state.user
)


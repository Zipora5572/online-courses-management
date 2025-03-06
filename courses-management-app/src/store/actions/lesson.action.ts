import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../models/lesson.model';

// פעולה להוספת שיעור
export const addLesson = createAction(
    '[Lesson] Add Lesson',
    props<{ courseId: number; lesson: Lesson }>()
);

// פעולה לעדכון שיעור
export const updateLesson = createAction(
    '[Lesson] Update Lesson',
    props<{ courseId: number; lesson: Lesson }>()
);

// פעולה למחיקת שיעור
export const deleteLesson = createAction(
    '[Lesson] Delete Lesson',
    props<{ courseId: number; id: number }>()
);

// פעולה לקבלת שיעורים
export const loadLessons = createAction(
    '[Lesson] Get Lessons',
    props<{ courseId: number }>()
);

// פעולה לטעינת שיעורים בהצלחה
export const loadLessonsSuccess = createAction(
    '[Lesson] Load Lessons Success',
    props<{ lessons: Lesson[] }>()
);

// פעולה לטעינת שיעורים עם שגיאה
export const loadLessonsFailure = createAction(
    '[Lesson] Load Lessons Failure',
    props<{ error: any }>()
);

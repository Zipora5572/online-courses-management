import { Action, createReducer, on } from "@ngrx/store";

import {  LessonState, initialLessonState } from "../state";
import { addLesson, deleteLesson, loadLessonsFailure, loadLessonsSuccess, updateLesson } from "../actions/lesson.action";


const _lessonReducer = createReducer(
    initialLessonState ,
    on(addLesson, (state, { lesson }) => ({
        ...state,
        Lessons: [...state.lessons, lesson]
    })),
    on(updateLesson, (state, { lesson }) => ({
        ...state,
        Lessons: state.lessons.map(s => s.id === lesson.id ? lesson : s)
    })),
    on(deleteLesson, (state, { id }) => ({
        ...state,
        Lessons: state.lessons.filter(Lesson => Lesson.id !== id)
    })),
    on(loadLessonsSuccess, (state, { lessons }) => ({
        ...state,
        lessons: lessons 
    })),
    on(loadLessonsFailure, (state, { error }) => ({
        ...state,
        
        error: error 
    }))
);

export function lessonReducer(state: LessonState | undefined, action: Action) {
    return _lessonReducer(state, action);
}

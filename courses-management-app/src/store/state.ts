import { Course } from "../models/course.model";
import { Lesson } from "../models/lesson.model";
import { User } from "../models/user.model";

export interface AppState {
    courses: CourseState;
    users: UserState;
    lessons: LessonState;
  }
  
  export interface CourseState {
    courses: Course[];
    loading: boolean;
    error: string | null;
  }
  
  export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
  }
  
  export interface LessonState {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialCourseState: CourseState = {
    courses: [],
    loading: false,
    error: null
};

export const initialUserState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const initialLessonState: LessonState = {
    lessons: [],
    loading: false,
    error: null
};

export const initialState: AppState = {
    courses: initialCourseState,
    users: initialUserState,
    lessons: initialLessonState
};
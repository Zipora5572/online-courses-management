import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects'; // הוסף את זה
import { courseReducer } from '../store/reducers/course.reducers';
import { CourseEffects } from '../store/effects/course.effects'; // הוסף את זה
import { lessonReducer } from '../store/reducers/lesson.reducer';
import { LessonEffects } from '../store/effects/lesson.effects';
import { authInterceptor } from './auth.interceptor';
import { userReducer } from '../store/reducers/user.reducer';
import { UserEffects } from '../store/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ 
      courses: courseReducer, 
      lessons: lessonReducer,
      user: userReducer
    }), 
    provideEffects([CourseEffects, LessonEffects,UserEffects]) ,
     provideHttpClient(withInterceptors([authInterceptor])),

  ]
};

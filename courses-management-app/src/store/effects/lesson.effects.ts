import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { LessonService } from '../../services/lesson.service'
import { loadLessons, loadLessonsSuccess, loadLessonsFailure, addLesson, updateLesson, deleteLesson } from '../actions/lesson.action'

@Injectable()
export class LessonEffects {
  private actions$ = inject(Actions)
  private lessonService = inject(LessonService)

  loadLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLessons),
      mergeMap(action =>
        this.lessonService.getLessons(action.courseId).pipe(
         
          
          map(lessons =>  loadLessonsSuccess({ lessons })),
          catchError(error => {
        //    console.error('Error loading lessons:', error)
            return of(loadLessonsFailure({ error }))
          })
        )
      )
    )
  )

  addLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addLesson),
      mergeMap(action =>
        this.lessonService.addLesson(action.courseId, action.lesson).pipe(
          map(response => {
          
            return loadLessons({courseId:action.courseId}) 
          }),
          catchError(error => {
           // console.error('Error adding lesson:', error)
            return of(loadLessonsFailure({ error }))
          })
        )
      )
    )
  )

  updateLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLesson),
      mergeMap(action =>
        this.lessonService.updateLesson(action.courseId, action.lesson).pipe(
          map(() => {
           
            return loadLessons({courseId:action.courseId}) 
          }),
          catchError(error => {
          //  console.error('Error updating lesson:', error)
            return of(loadLessonsFailure({ error }))
          })
        )
      )
    )
  )

  deleteLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLesson),
      mergeMap(action =>
        this.lessonService.deleteLesson(action.courseId, action.id).pipe(
          map(() => {
         
            return loadLessons({courseId:action.courseId}) 
          }),
          catchError(error => {
            //console.error('Error deleting lesson:', error)
            return of(loadLessonsFailure({ error }))
          })
        )
      )
    )
  )
}

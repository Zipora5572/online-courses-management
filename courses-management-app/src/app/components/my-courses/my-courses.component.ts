import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { selectAllCourses, selectCourseState, selectCurrentUserCourses, selectLoading } from '../../../store/selectors/course.selector';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { enrollInCourse, loadCourses, loadCoursesByStudentId, unenrollInCourse } from '../../../store/actions/course.actions';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { AsyncPipe } from '@angular/common';
import { selectCurrentUser, selectUserState } from '../../../store/selectors/user.selector';
import { User } from '../../../models/user.model';
import { UserState } from '../../../store/state';
import { loadUser } from '../../../store/actions/user.action';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CourseDetailsComponent,AsyncPipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  currentUserCourses$:Observable<Course[]>
  loading$: Observable<boolean>;
  user$: Observable<User|null>;
  userId: number|undefined=undefined;
  constructor(private store: Store,private router: Router) {
    this.user$ = this.store.select(selectCurrentUser);
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(loadUser())
    this.user$.subscribe(user => {
      if (user) {
        this.userId = user.id; 
        
        
        this.store.dispatch(loadCoursesByStudentId({studentId:this.userId})); 


        this.currentUserCourses$ = this.store.select(selectCurrentUserCourses)
        
        
      }
    })
  }
 
  ngOnInit() {
    this.user$ = this.store.select(selectCurrentUser);
    this.store.dispatch(loadUser())
    // Subscribe to user$ to get the userId
    // this.user$.subscribe(user => {
    //   if (user) {
    //     this.userId = user.id; // Set userId from the user object
    //     this.store.dispatch(loadCoursesByStudentId({studentId:this.userId})); // טוען את הקורסים

    //     // בוחר את הקורסים הנוכחיים למשתנה
    //     this.currentUserCourses$ = this.store.pipe(select(selectCurrentUserCourses));
    //   }
    // });
  }
  joinCourse(courseId: number) {  
      this.store.dispatch(enrollInCourse({ courseId }));
  }

  leaveCourse(courseId: number) {
    this.store.dispatch(unenrollInCourse({ courseId }));
    

  }

}

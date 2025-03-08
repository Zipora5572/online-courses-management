import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { selectAllCourses, selectLoading } from '../../../store/selectors/course.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { enrollInCourse, loadCourses, loadCoursesByStudentId, unenrollInCourse } from '../../../store/actions/course.actions';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { AsyncPipe } from '@angular/common';
import { selectCurrentUser, selectUserState } from '../../../store/selectors/user.selector';
import { User } from '../../../models/user.model';
import { UserState } from '../../../store/state';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseDetailsComponent,AsyncPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  user$: Observable<User|null>;
  userId: number|undefined=undefined;
  constructor(private store: Store,private router: Router) {
    this.user$ = this.store.select(selectCurrentUser);
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectLoading);
  }
 
  ngOnInit() {
    
      this.store.dispatch(loadCourses());       
      this.courses$ = this.store.select(selectAllCourses);
    };
  
  joinCourse(courseId: number) {  
      this.store.dispatch(enrollInCourse({ courseId }));
  }

  leaveCourse(courseId: number) {
    this.store.dispatch(unenrollInCourse({ courseId }));
    

  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course.model';
import { selectAllCourses, selectLoading } from '../../../store/selectors/course.selector';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { enrollInCourse, loadCourses } from '../../../store/actions/course.actions';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CourseDetailsComponent,AsyncPipe],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store,private router: Router) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectLoading);
  }
  ngOnInit() {
    this.store.dispatch(loadCourses());
  }

  joinCourse(courseId: number) {  
      this.store.dispatch(enrollInCourse({ courseId }));
  }

  leaveCourse(courseId: number,userId: number) {
    

  }

}

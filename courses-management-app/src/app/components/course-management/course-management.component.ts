import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCourses,deleteCourse } from '../../../store/actions/course.actions';
import { Course } from '../../../models/course.model';
import { selectAllCourses, selectLoading } from '../../../store/selectors/course.selector';
import { Router } from '@angular/router';
import { log } from 'console';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TextToIconPipe } from "../../pipes/text-to-icon.pipe";


@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CourseDetailsComponent,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatIconButton, TextToIconPipe],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store,private router: Router) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadCourses());
  }

  addCourse() {
    this.router.navigate(['/upsert-course'])
  }
  
 
  updateCourse(course: Course) {
    this.router.navigate(['/upsert-course', { id: course.id }]); 
  }

  deleteCourse(courseId: number) {
    this.store.dispatch(deleteCourse({ courseId }));
  }
}
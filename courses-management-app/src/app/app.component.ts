import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CourseManagementComponent } from "./components/course-management/course-management.component";
import { CourseUpsertComponent } from "./components/course-upsert/course-upsert.component";
import { Store } from '@ngrx/store';
import { CourseState } from '../store/state';
import { loadCourses } from '../store/actions/course.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AuthComponent, CourseManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 constructor(private store: Store<{ courses: CourseState }>) {
  //  this.store.dispatch(loadCourses());
 }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { AuthComponent } from "./components/auth/auth.component";
import { CourseManagementComponent } from "./components/course-management/course-management.component";
import { CourseUpsertComponent } from "./components/course-upsert/course-upsert.component";
import { Store } from '@ngrx/store';
import { CourseState } from '../store/state';
import { loadCourses } from '../store/actions/course.actions';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { loginUserSuccess } from '../store/actions/user.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private store: Store, private userService: UserService) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(+userId).subscribe(user => {
        this.store.dispatch(loginUserSuccess({ user })); 
      });
    }
  }
}
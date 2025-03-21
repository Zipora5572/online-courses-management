import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AuthComponent } from './components/auth/auth.component';
import { AboutComponent } from './components/about/about.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseUpsertComponent } from './components/course-upsert/course-upsert.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { LessonsListComponent } from './components/lessons-list/lessons-list.component';
import { manageCoursesGuard } from './guards/manage-courses.guard';
import { studentGuard } from './guards/student.guard';
import { CoursesComponent } from './components/courses/courses.component';

export const routes: Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'upsert-course', component: CourseUpsertComponent },
    { path: 'courses-management', component: CourseManagementComponent, canActivate: [manageCoursesGuard] },
    { path: 'my-courses', component: MyCoursesComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'course/:id/lessons', component: LessonsListComponent },
    { path: '', component: HomeComponent },
    { path: 'course/:id', component: CourseDetailsComponent },
    { path: '**', redirectTo: '/login' }
    ];
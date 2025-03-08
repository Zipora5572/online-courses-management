import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Lesson } from '../../../models/lesson.model';
import { Observable } from 'rxjs';
import { selectLessonsByCourseId, selectLoading } from '../../../store/selectors/lesson.selector';
import { AsyncPipe } from '@angular/common';
import { addLesson, deleteLesson, loadLessons, updateLesson } from '../../../store/actions/lesson.action';
import { MatDialog } from '@angular/material/dialog';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextToIconPipe } from "../../pipes/text-to-icon.pipe";

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatProgressSpinnerModule, TextToIconPipe],
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;
  id: number;
  role: string; 

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {}

  ngOnInit() {
   
  
    this.route.params.subscribe(params => {
      this.id = +params['id'];
if(this.id)
    {  this.store.dispatch(loadLessons({ courseId: this.id }));
      this.lessons$ = this.store.select(selectLessonsByCourseId(this.id));
      this.loading$ = this.store.select(selectLoading);}
    });

    this.route.queryParams.subscribe(params => {
      this.role = params['role']; 
    });
  }

  deleteLesson(lessonId: number) {
    this.store.dispatch(deleteLesson({ courseId: this.id, id: lessonId }));
  }

  addLesson() {
    const dialogRef = this.dialog.open(LessonFormComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addLesson({ courseId: this.id, lesson: result }));
      }
    });
  }

  editLesson(lesson: Lesson) {
    const dialogRef = this.dialog.open(LessonFormComponent, {
      width: '400px',
      data: lesson
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateLesson({ courseId: this.id, lesson: result }));
      }
    });
  }
  goBack() {
    if(this.role==='teacher') 
    this.router.navigate(['/courses-management']); 
  else 
    this.router.navigate(['/my-courses']);
  }
}

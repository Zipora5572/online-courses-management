import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CourseState, LessonState } from '../../../store/state';
import { addCourse, updateCourse } from '../../../store/actions/course.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { addLesson, deleteLesson, loadLessons, updateLesson } from '../../../store/actions/lesson.action';
import { selectCourseById } from '../../../store/selectors/course.selector';
import { Lesson } from '../../../models/lesson.model';
import { selectLessonsByCourseId } from '../../../store/selectors/lesson.selector';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-course-upsert',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './course-upsert.component.html',
  styleUrls: ['./course-upsert.component.css']
})
export class CourseUpsertComponent implements OnInit {
  courseForm: FormGroup;
  lessonGroup: FormGroup;
  courseId: number | null = null;
  initialState: Lesson = { title: '', content: '', courseId: 0, id: 0 };
  existingLessonIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<{ courses: CourseState, lessons: LessonState }>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      teacherId: ['', [Validators.required]],
      lessons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.courseId = +id;
        this.store.select(selectCourseById(id)).subscribe(course => {
          if (course) {
            this.courseForm.patchValue({
              title: course.title,
              description: course.description,
              teacherId: course.teacherId
            });
          }
          this.store.select(selectLessonsByCourseId(id)).subscribe(lessons => {
            this.existingLessonIds = lessons.map(lesson => lesson.id);
            const existingLessonIdsInForm = this.lessons.controls.map(control => control.value.id);
            lessons.forEach(lesson => {
              if (!existingLessonIdsInForm.includes(lesson.id)) {
                this.addLessonForm(lesson);
              }
            });
          });
        });
      }
      if (isPlatformBrowser(this.platformId)) {
        this.courseForm.patchValue({
          teacherId: sessionStorage.getItem('userId')
        });
      }
     
    });
    this.store.dispatch(loadLessons({ courseId: this.courseId as number }));
  }

  get lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  addLessonForm(lesson: Lesson) {
    const lessonGroup = this.fb.group({
      id: [lesson.id],
      title: [lesson.title, Validators.required],
      content: [lesson.content, Validators.required]
    });
    this.lessons.push(lessonGroup);
  }

  removeLessonForm(index: number) {
    this.lessons.removeAt(index);
  }

  addLesson(lesson: Lesson) {
    const lessonData = {
      title: lesson.title,
      content: lesson.content,
      courseId: this.courseId
    };
    this.store.dispatch(addLesson({ courseId: this.courseId as number, lesson: lessonData as Lesson }));
  }

  updateLesson(lesson: Lesson) {
    const lessonData = {
      title: lesson.title,
      content: lesson.content,
      courseId: this.courseId
    };
    this.store.dispatch(updateLesson({ courseId: this.courseId as number, lesson: lessonData as Lesson }));
  }

  removeLesson(courseId: number, id: number) {
    this.store.dispatch(deleteLesson({ courseId: courseId, id: id }));
  }

  onSubmit() {
    const teacherId=null
    if (typeof window !== 'undefined') {
      const teacherId = sessionStorage.getItem('userId');
    }

    const courseData = {
      ...this.courseForm.value,
      teacherId
    };

    if (this.courseForm.valid) {
      if (this.courseId) {
        this.store.dispatch(updateCourse({ course: courseData }));

        const currentLessonIds = this.lessons.controls.map(control => control.value.id);
        const lessonsToRemove = this.existingLessonIds.filter(id => !currentLessonIds.includes(id));

        lessonsToRemove.forEach(id => {
          this.removeLesson(this.courseId as number, id);
        });

        this.lessons.controls.forEach((lessonGroup) => {
          const lesson = lessonGroup.value;
          if (lesson.id) {
            this.updateLesson({ ...lesson, courseId: this.courseId });
          } else {
            this.addLesson({ ...lesson, courseId: this.courseId });
          }
        });
      } else {
        this.store.dispatch(addCourse({ course: courseData }));
      }
      this.router.navigate(['/courses-management']);
    }
  }
}
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from '../../../models/lesson.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  lesson: Lesson;

  constructor(
    public dialogRef: MatDialogRef<LessonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lesson
  ) {
    this.lesson = { ...data }; 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.lesson);
  }
}

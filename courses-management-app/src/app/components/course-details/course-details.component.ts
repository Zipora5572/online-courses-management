import { Component, Input } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import {  RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterModule,MatCardModule,MatIconModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {



  @Input() id: number 
  @Input() title: string
  @Input() description: string
  @Input() teacherId : number 
  @Input() lessons: Lesson[];
  @Input() role: string; 

}

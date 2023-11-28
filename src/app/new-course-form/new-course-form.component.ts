import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-course-form.component.html',
  styleUrl: './new-course-form.component.css',
})
export class NewCourseFormComponent {
  categories = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Arts' },
    { id: 3, name: 'Languages' },
  ];

  submit(course: any) {
    console.log(course);
  }
}

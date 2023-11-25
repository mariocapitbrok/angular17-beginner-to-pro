import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ title }}</h2>
    <img [src]="imageUrl" alt="" />
  `,
})
export class CoursesComponent {
  title = 'List of courses';
  imageUrl = 'http://lorempixel.com/400/200';
}

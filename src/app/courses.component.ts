import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  standalone: true,
  template: '<h2>{{ "Title: " + getTitle() }}</h2>',
})
export class CoursesComponent {
  title = 'List of courses';

  getTitle() {
    return this.title;
  }
}

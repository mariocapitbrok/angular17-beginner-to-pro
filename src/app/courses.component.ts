import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'courses',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to the imports array
  template: ` <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" /> `,
})
export class CoursesComponent {
  email = 'me@example.com';

  onKeyUp() {
    console.log(this.email);
  }
}

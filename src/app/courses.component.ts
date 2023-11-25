import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-primary" [class.active]="isActive">Save</button>
  `,
})
export class CoursesComponent {
  isActive = true;
}

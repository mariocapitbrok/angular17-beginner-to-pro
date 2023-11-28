import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zippy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zippy.component.html',
  styleUrl: './zippy.component.css',
})
export class ZippyComponent {
  @Input('title') title!: string;
  isExpanded!: boolean;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

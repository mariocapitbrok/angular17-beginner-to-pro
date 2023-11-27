import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() likesCount = 0;
  @Input() isActive = true;

  onClick() {
    this.likesCount += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }
}

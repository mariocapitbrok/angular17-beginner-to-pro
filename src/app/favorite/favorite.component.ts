import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent {
  isFavorite = true;

  onClick() {
    this.isFavorite = !this.isFavorite;
  }
}

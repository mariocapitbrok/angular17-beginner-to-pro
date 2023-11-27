import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core'; //@angular/core

@Component({
  selector: 'favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent {
  @Input('isFavorite') isSelected = true;
  @Output() change = new EventEmitter();

  onClick() {
    this.isSelected = !this.isSelected;
    this.change.emit(this.isSelected);
  }
}

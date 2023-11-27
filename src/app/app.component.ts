import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FavoriteChangedEventArgs,
  FavoriteComponent,
} from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FavoriteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  post = {
    title: 'Title',
    isFavorite: true,
  };

  onFavoriteChange(eventArgs: FavoriteChangedEventArgs) {
    console.log('Favorite changed: ', eventArgs);
  }
}

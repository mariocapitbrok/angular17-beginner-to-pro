import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts!: any[];

  constructor(http: HttpClient) {
    http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((response) => {
        this.posts = response as any[];
      });
  }
}

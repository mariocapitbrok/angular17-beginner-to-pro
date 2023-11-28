import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Post } from './post.interface';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts!: Post[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    http.get(this.url).subscribe((response) => {
      this.posts = response as Post[];
    });
  }

  createPost(input: HTMLInputElement) {
    let post: Post = { title: input.value };
    input.value = '';

    this.http
      .post<Post>(this.url, JSON.stringify(post))
      .subscribe((response) => {
        post.id = response.id;
        this.posts.splice(0, 0, post);
        console.log(response);
      });
  }

  updatePost(post: Post) {
    //this.http.put(this.url, JSON.stringify(post));
    this.http
      .patch(
        this.url + '/' + post.id,
        JSON.stringify({
          isRead: true,
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(post: Post) {
    this.http.delete(this.url + '/' + post.id).subscribe((response) => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }
}

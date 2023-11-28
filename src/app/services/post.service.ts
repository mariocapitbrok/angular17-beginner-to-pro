import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../posts/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post: Post) {
    return this.http.post<Post>(this.url, JSON.stringify(post));
  }

  updatePost(post: Post) {
    //return this.http.put(this.url, JSON.stringify(post));
    return this.http.patch(
      this.url + '/' + post.id,
      JSON.stringify({
        isRead: true,
      })
    );
  }

  deletePost(id?: number) {
    return this.http.delete(this.url + '/' + id);
  }
}

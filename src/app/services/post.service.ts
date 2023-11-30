import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../posts/post.interface';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { error } from 'console';
import { BadInput } from '../common/bad-input';

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
    return this.http.post<Post>(this.url, JSON.stringify(post)).pipe(
      catchError((error: Response) => {
        if (error.status === 400) {
          return throwError(() => new BadInput(error.json()));
        }

        return throwError(() => new AppError(error.json()));
      })
    );
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
    return this.http.delete(this.url + '/' + id).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }

        return throwError(() => new AppError(error.json()));
      })
    );
  }
}

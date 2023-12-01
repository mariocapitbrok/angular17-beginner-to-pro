import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Post } from '../posts/post.interface';
import { catchError, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

// Define an injection token for the URL
export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(API_URL) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  create(resource: any) {
    return this.http
      .post<Post>(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    //return this.http.put(this.url, JSON.stringify(post));
    return this.http
      .patch(
        this.url + '/' + resource.id,
        JSON.stringify({
          isRead: true,
        })
      )
      .pipe(catchError(this.handleError));
  }

  delete(id?: number) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(() => new BadInput(error.json()));
    }

    if (error.status === 404) {
      return throwError(() => new NotFoundError());
    }

    return throwError(() => new AppError(error.json()));
  }
}

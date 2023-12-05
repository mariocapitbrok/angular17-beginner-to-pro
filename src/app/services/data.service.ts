import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';

export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class DataService<T> {
  constructor(@Inject(API_URL) private url: string, private http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(catchError(this.handleError));
  }

  create(resource: T): Observable<T> {
    return this.http
      .post<T>(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  update(id: number, resource: T): Observable<T> {
    return this.http
      .patch<T>(this.url + '/' + id, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  delete(id?: number): Observable<any> {
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

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpoint = 'users';
  url = this.requestService.getBackendUrl();
  headers = this.requestService.getHeaders();

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public create(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.url}/${this.endpoint}`,
        user, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(user: User, id): Observable<User> {
    return this.http
      .put<User>(`${this.url}/${this.endpoint}/${id}`,
        user, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getOne(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.url}/${this.endpoint}/${id}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.url}/${this.endpoint}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(id: string) {
    return this.http
      .delete(`${this.url}/${this.endpoint}/${id}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      `Error.\n${error.status} ${error.error}`);
  }
}

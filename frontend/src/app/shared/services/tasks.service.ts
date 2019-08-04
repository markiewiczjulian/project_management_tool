import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Task } from '../models/task';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  endpoint = 'tasks';
  url = this.requestService.getBackendUrl();
  headers = this.requestService.getHeaders();

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public create(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${this.url}/${this.endpoint}`,
        task, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(task: Task, id): Observable<Task> {
    return this.http
      .put<Task>(`${this.url}/${this.endpoint}/${id}`,
        task, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getOne(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${this.url}/${this.endpoint}/${id}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAll(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/${this.endpoint}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(id: number) {
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

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Sprint } from '../models/sprint';
import { SprintTask } from '../models/sprint-tasks';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  endpoint = 'sprints';
  url = this.requestService.getBackendUrl();
  headers = this.requestService.getHeaders();

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public create(sprint: Sprint): Observable<Sprint> {
    return this.http
      .post<Sprint>(`${this.url}/${this.endpoint}`,
        sprint, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(sprint: Sprint, id): Observable<Sprint> {
    return this.http
      .put<Sprint>(`${this.url}/${this.endpoint}/${id}`,
        sprint, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getOne(id: number): Observable<Sprint> {
    return this.http
      .get<Sprint>(`${this.url}/${this.endpoint}/${id}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAll(): Observable<Sprint[]> {
    return this.http
      .get<Sprint[]>(`${this.url}/${this.endpoint}`,
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

  public deleteTask(sprintTask: SprintTask) {
    return this.http
      .patch(`${this.url}/${this.endpoint}/task`,
        sprintTask, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public addTask(sprintTask: SprintTask) {
    return this.http
      .post(`${this.url}/${this.endpoint}/task`,
        sprintTask, { headers: new HttpHeaders(this.headers) })
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

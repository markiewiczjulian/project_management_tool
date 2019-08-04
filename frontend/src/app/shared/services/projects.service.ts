import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Project } from '../models/project';
import { RequestService } from './request.service';
import { ProjectSprint } from '../models/project-sprints';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  endpoint = 'projects';
  url = this.requestService.getBackendUrl();
  headers = this.requestService.getHeaders();

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public create(project: Project): Observable<Project> {
    return this.http
      .post<Project>(`${this.url}/${this.endpoint}`,
        project, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(project: Project, id): Observable<Project> {
    return this.http
      .put<Project>(`${this.url}/${this.endpoint}/${id}`,
        project, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getOne(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${this.url}/${this.endpoint}/${id}`,
        { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAll(): Observable<Project[]> {
    return this.http
      .get<Project[]>(`${this.url}/${this.endpoint}`,
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

  public deleteSprint(projectSprint: ProjectSprint) {
    return this.http
      .patch(`${this.url}/${this.endpoint}/sprint`,
        projectSprint, { headers: new HttpHeaders(this.headers) })
      .pipe(
        catchError(this.handleError)
      );
  }

  public addSprint(projectSprint: ProjectSprint) {
    return this.http
      .post(`${this.url}/${this.endpoint}/sprint`,
        projectSprint, { headers: new HttpHeaders(this.headers) })
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

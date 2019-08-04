import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

import { RequestService } from './request.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'auth';
  url = this.requestService.getBackendUrl();
  headers = this.requestService.getHeadersAuth();

  constructor(private http: HttpClient, private requestService: RequestService) { }

  public logIn(body) {
    return this.http.post(`${this.url}/${this.endpoint}`, body,
      {
        headers: new HttpHeaders(this.headers),
        responseType: 'text'
      }).pipe(
        tap((token) => {
          localStorage.setItem('authToken', token);
        }),
        catchError(this.handleError)
      );
  }

  public logOut() {
    localStorage.removeItem('authToken');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const isAdmin = jwt_decode(token);
      return isAdmin.isAdmin ? true : false;
    } else {
      return false;
    }
  }

  public getLoggedUser(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      const userId = jwt_decode(token);
      return userId._id ? userId._id : false;
    } else {
      return false;
    }
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

import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private backendUrl = environment.backendUrl;
  private token = localStorage.getItem('authToken');
  private headerDict = {'x-auth-token': this.token};
  private headerDictAuth = environment.headerDictAuth;

  public getHeaders() {
    return this.headerDict;
  }

  public getHeadersAuth() {
    return this.headerDictAuth;
  }

  public getBackendUrl() {
    return this.backendUrl;
  }

  constructor() { }
}

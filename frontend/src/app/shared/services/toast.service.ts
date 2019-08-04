import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { Toast, ToastType } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private subject = new Subject<Toast>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getToast(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = true) {
    this.alert(ToastType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = true) {
    this.alert(ToastType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = true) {
    this.alert(ToastType.Info, message, keepAfterRouteChange);
  }

  alert(type: ToastType, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Toast>{ type: type, message: message });
  }

  clear() {
    this.subject.next();
  }
}

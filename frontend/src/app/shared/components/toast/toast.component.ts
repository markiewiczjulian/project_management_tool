import { Component, OnInit } from '@angular/core';
import { Toast, ToastType } from '../../models/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.getToast().subscribe((toast: Toast) => {
      if (!toast) {
        this.toasts = [];
        return;
      }
      if (this.toasts.length >= 3) {
        this.toasts.shift();
      }
      this.toasts.push(toast);
    });
  }

  removeAlert(toast: Toast) {
    this.toasts = this.toasts.filter(x => x !== toast);
  }

  cssClass(toast: Toast) {
    if (!toast) {
      return;
    }
    switch (toast.type) {
      case ToastType.Success:
        return 'alert alert-success';
      case ToastType.Error:
        return 'alert alert-danger';
      case ToastType.Info:
        return 'alert alert-primary';
    }
  }
}

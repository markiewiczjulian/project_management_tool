import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private toastService: ToastService) { }

  logIn(form) {
    this.authService.logIn(form.value)
      .subscribe(() => {
        window.location.reload();
        this.router.navigate(['/home']);
        this.toastService.success('You have logged in.');
      }, (err: string) => {
        this.toastService.error(err);
      },
        form.resetForm());
  }

  ngOnInit() {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/home']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  loggedUser: string;

  constructor(private auth: AuthService, private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getLoggedUser();
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/login']);
    this.toastService.success('You have logged out.');
  }

  getLoggedUser() {
    this.loggedUser = this.auth.getLoggedUser();
  }
}

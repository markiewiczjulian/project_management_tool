import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  isAdmin: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  users: User[];
  currentUserId: string;

  constructor(private usersService: UsersService, private auth: AuthService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  deleteUser(id) {
    this.usersService.delete(id).subscribe(() => {
      this.getAllUsers();
      this.toastService.success(`You have deleted a user "${id}"`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  getAllUsers() {
    this.usersService.getAll().subscribe(data => {
      this.users = data;
      this.currentUserId = this.auth.getLoggedUser();
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

}

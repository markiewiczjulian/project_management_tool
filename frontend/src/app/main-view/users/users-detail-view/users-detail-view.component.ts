import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-detail-view',
  templateUrl: './users-detail-view.component.html',
  styleUrls: ['./users-detail-view.component.css']
})
export class UsersDetailViewComponent implements OnInit {

  user: User;
  passwordPlaceholder = 'somePlaceholderText';
  blockRemoving = false;
  isAdmin: boolean;

  constructor(private usersService: UsersService, private auth: AuthService,
    private route: ActivatedRoute, private router: Router, private toastService: ToastService,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
    this.isAdmin = this.auth.isAdmin();
  }

  getUser(id) {
    this.usersService.getOne(id).subscribe(data => {
      this.user = data;
      this.user.password = this.passwordPlaceholder;
      if (this.user._id === this.auth.getLoggedUser()) {
        this.blockRemoving = true;
      }
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteUser(id) {
    this.usersService.delete(id).subscribe(() => {
      this.toastService.success(`You have deleted a user "${this.user.name}"`);
      this.router.navigate(['/users']);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  editUser(form) {
    if (form.value.password === this.passwordPlaceholder) {
      delete form.value.password;
    }
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    form.value.isAdmin = this.user.isAdmin;
    this.usersService.update(form.value, this.user._id).subscribe(() => {
      this.toastService.success(`You have saved a user "${this.user.name}"`);
      form.resetForm();
      this.goBack();
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/users.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-users-new-view',
  templateUrl: './users-new-view.component.html',
  styleUrls: ['./users-new-view.component.css']
})
export class UsersNewViewComponent implements OnInit {

  constructor(private usersService: UsersService,
    private router: Router, private toastService: ToastService) { }

  ngOnInit() {
  }

  addUser(form) {
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    this.usersService.create(form.value).subscribe(() => {
      this.toastService.success(`You have added a user "${form.value.name}"`);
      form.resetForm();
      this.router.navigate(['/users']);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }
}

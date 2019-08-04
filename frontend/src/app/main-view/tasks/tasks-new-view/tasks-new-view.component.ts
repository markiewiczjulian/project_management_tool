import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../shared/services/tasks.service';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-new-view',
  templateUrl: './tasks-new-view.component.html',
  styleUrls: ['./tasks-new-view.component.css']
})
export class TasksNewViewComponent implements OnInit {

  users: User[];
  constructor(private tasksService: TasksService, private usersService: UsersService,
    private auth: AuthService, private toastService: ToastService,
    private location: Location) { }

  ngOnInit() {
    this.getUsers();
  }

  addTask(form) {
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    form.value.createdBy = this.auth.getLoggedUser();
    this.tasksService.create(form.value).subscribe(() => {
      this.toastService.success(`You have added a task "${form.value.name}"`);
      if (form.value.status === 'none') {
        this.toastService.info(`Tasks with status "none" will not
         be present on kanban board.`);
      }
      form.resetForm();
      this.goBack();
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  getUsers() {
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  goBack() {
    this.location.back();
  }
}

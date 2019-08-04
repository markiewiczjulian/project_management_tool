import { Component, OnInit } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { TasksService } from '../../../shared/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-tasks-detail-view',
  templateUrl: './tasks-detail-view.component.html',
  styleUrls: ['./tasks-detail-view.component.css']
})
export class TasksDetailViewComponent implements OnInit {

  task: Task;
  users: User[];
  placeholder = 'none';

  constructor(private taskService: TasksService, private usersService: UsersService,
    private auth: AuthService, private route: ActivatedRoute, private router: Router,
    private toastService: ToastService, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getTask(id);
    this.getUsers();
  }

  getTask(id) {
    this.taskService.getOne(id).subscribe(data => {
      this.task = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteTask(id) {
    this.taskService.delete(id).subscribe(() => {
      this.toastService.success(`You have deleted a task "${this.task.name}"`);
      this.goBack();
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  editTask(form) {
    if (form.value.assignedTo === this.placeholder) {
      delete form.value.assignedTo;
    }
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    form.value.modifiedBy = this.auth.getLoggedUser();
    this.taskService.update(form.value, this.task._id).subscribe(
      () => {
        this.toastService.success(`You have saved a task "${this.task.name}"`);
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

import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../../shared/models/sprint';
import { User } from '../../../shared/models/user';
import { SprintsService } from '../../../shared/services/sprints.service';
import { UsersService } from '../../../shared/services/users.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../shared/services/tasks.service';
import { Task } from '../../../shared/models/task';
import { SprintTask } from '../../../shared/models/sprint-tasks';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-sprints-detail-view',
  templateUrl: './sprints-detail-view.component.html',
  styleUrls: ['./sprints-detail-view.component.css']
})
export class SprintsDetailViewComponent implements OnInit {

  sprint: Sprint;
  tasks: Task[];
  users: User[];
  placeholder = 'none';
  id = this.route.snapshot.paramMap.get('id');
  isAdmin: boolean;

  constructor(private sprintService: SprintsService, private usersService: UsersService,
    private taskService: TasksService, private auth: AuthService,
    private route: ActivatedRoute, private router: Router, public ngxSmartModalService:
      NgxSmartModalService, private toastService: ToastService) { }

  ngOnInit() {
    this.getSprint(this.id);
    this.getTasks();
    this.isAdmin = this.auth.isAdmin();
  }

  getSprint(id) {
    this.sprintService.getOne(id).subscribe(data => {
      this.sprint = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteSprint(id) {
    this.sprintService.delete(id).subscribe(() => {
      this.toastService.success(`You have deleted a sprint "${this.sprint.name}"`);
      this.router.navigate(['/sprints']);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  editSprint(form) {
    form.value.subtasks = this.sprint.subtasks.map(task => task._id);
    this.sprintService.update(form.value, this.sprint._id).subscribe(
      () => {
        this.toastService.success(`You have saved a sprint "${this.sprint.name}"`);
        form.resetForm();
        this.router.navigate(['/sprints']);
      }, (err: string) => {
        this.toastService.error(err);
      });
  }

  deleteSubTask(sprintId: string, taskId: string) {
    const sprintTask: SprintTask = { task: taskId, sprint: sprintId };
    this.sprintService.deleteTask(sprintTask).subscribe(() => {
      this.getSprint(this.id);
      this.toastService.success(`You have removed task "${taskId}" from a sprint.`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  addSubTasks(sprintId: string, taskId: string) {
    const sprintTask: SprintTask = { task: taskId, sprint: sprintId };
    this.sprintService.addTask(sprintTask).subscribe(() => {
      this.getSprint(this.id);
      this.toastService.success(`You have added task "${taskId}" to a sprint.`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  getTasks() {
    this.taskService.getAll().subscribe(data => {
      this.tasks = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

}

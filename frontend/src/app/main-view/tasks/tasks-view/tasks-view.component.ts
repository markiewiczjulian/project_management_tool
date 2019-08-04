import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../shared/services/tasks.service';
import { Task } from '../../../shared/models/task';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {

  tasks: Task[];

  constructor(private tasksService: TasksService, private toastService: ToastService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAll().subscribe(data => {
      this.tasks = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteTask(id) {
    this.tasksService.delete(id).subscribe(() => {
      this.getAllTasks();
      this.toastService.success(`You have deleted a task "${id}"`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

}

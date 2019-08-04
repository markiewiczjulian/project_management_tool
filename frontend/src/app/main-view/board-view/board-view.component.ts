import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service';
import { TasksService } from '../../shared/services/tasks.service';
import { Task } from '../../shared/models/task';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from '../../shared/models/project';
import { AuthService } from '../../shared/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css']
})
export class BoardViewComponent implements OnInit {

  tasks: Task[];
  toDoArr: Task[] = [];
  progresArr: Task[] = [];
  reviewArr: Task[] = [];
  doneArr: Task[] = [];
  noneArr: Task[] = [];
  projects: Project[];

  constructor(private tasksService: TasksService, private projectsService: ProjectsService,
    public ngxSmartModalService: NgxSmartModalService, private auth: AuthService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getProjects();
  }

  getProjects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  getTasks() {
    this.tasksService.getAll().subscribe(data => {
      this.tasks = data;
      this.sortTasks(data);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  sortTasks(tasks) {
    this.noneArr = [];
    this.progresArr = [];
    this.reviewArr = [];
    this.toDoArr = [];
    this.doneArr = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === 'to do') {
        this.toDoArr.push(tasks[i]);
      } else if (tasks[i].status === 'in progres') {
        this.progresArr.push(tasks[i]);
      } else if (tasks[i].status === 'in review') {
        this.reviewArr.push(tasks[i]);
      } else if (tasks[i].status === 'done') {
        this.doneArr.push(tasks[i]);
      } else if (tasks[i].status === 'none') {
        this.noneArr.push(tasks[i]);
      }
    }
  }

  changeTasksStatus(task, taskId, status) {
    task.modifiedBy = this.auth.getLoggedUser();
    task.status = status;
    task.assignedTo ? task.assignedTo = task.assignedTo._id : task.assignedTo = null;
    delete task.modificationDate;
    delete task.createDate;
    delete task.createdBy;
    delete task._id;
    delete task.__v;
    Object.keys(task).forEach(k => (!task[k] && task[k] !==
      undefined) && delete task[k]);
    this.tasksService.update(task, taskId).subscribe(() => {
      this.getTasks();
      this.toastService.success(`You have changed status of a task "${task.name}"
       to "${status}".`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.changeTasksStatus(event.item.data, event.item.data._id, event.container.id);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

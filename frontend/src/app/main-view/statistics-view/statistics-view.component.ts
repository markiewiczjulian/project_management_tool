import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../shared/services/tasks.service';
import { Task } from '../../shared/models/task';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics-view',
  templateUrl: './statistics-view.component.html',
  styleUrls: ['./statistics-view.component.css']
})
export class StatisticsViewComponent implements OnInit {

  tasks: Task[];
  toDoArr: Task[] = [];
  doneArr: Task[] = [];
  reviewArr: Task[] = [];
  progresArr: Task[] = [];
  noneArr: Task[] = [];
  chartsColors = ['#ffbb78', '#ff9896', '#c5b0d5', '#aec7e8', '#98df8a', '#f7b6d2',
    '#dbdb8d', '#c7c7c7', '#c49c94', '#9edae5', '#ffbb78', '#ff9896', '#c5b0d5',
    '#aec7e8', '#98df8a', '#f7b6d2', '#dbdb8d', '#c7c7c7', '#c49c94', '#9edae5'];
  statusChart;
  assignedChart;
  taskTypesChartLabels = ['none', 'to do', 'in progress', 'in review', 'done'];
  taskTypesChartValues = [];
  assignedChartLabels = [];
  assignedChartValues = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getAll().subscribe(data => {
      this.tasks = data;
      this.countTypeOfTasks(this.tasks);
      this.statusChart = new Chart('statusChart', {
        type: 'pie',
        data: {
          labels: this.taskTypesChartLabels,
          datasets: [{
            label: "tasks for each status",
            backgroundColor: this.chartsColors,
            data: this.taskTypesChartValues
          }]
        },
        options: {
          title: {
            display: false
          }
        }
      });
      this.countAssignedTasks(this.tasks);
      this.assignedChart = new Chart('assignedChart', {
        type: 'bar',
        data: {
          labels: this.assignedChartLabels,
          datasets: [{
            label: "tasks for each user",
            backgroundColor: this.chartsColors,
            data: this.assignedChartValues
          }]
        },
        options: {
          legend: { display: false },
          title: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks:
                {
                  display: false,
                  min: 0.7
                },
                gridLines: {
                  color: 'none',
                  display: false,
                  drawOnChartArea: false,
                  drawBorder: false,
                  drawTicks: false
                }
              }
            ],
            xAxes: [{
              gridLines: {
                display: false,
                drawOnChartArea: false,
                drawTicks: false
              }
            }]
          }
        }
      });
    });
  }

  countTypeOfTasks(tasks) {
    const toDoLen = tasks.reduce((acc, cur) => cur.status === 'to do' ? ++acc : acc, 0);
    const doneLen = tasks.reduce((acc, cur) => cur.status === 'done' ? ++acc : acc, 0);
    const noneLen = tasks.reduce((acc, cur) => cur.status === 'none' ? ++acc : acc, 0);
    const progrLen = tasks.reduce((acc, cur) => cur.status === 'in progres' ? ++acc : acc, 0);
    const reviewLen = tasks.reduce((acc, cur) => cur.status === 'in review' ? ++acc : acc, 0);
    this.taskTypesChartValues = [noneLen, toDoLen, progrLen, reviewLen, doneLen];
  }

  countAssignedTasks(tasks) {
    const users = tasks.filter((x) => x.assignedTo && x.assignedTo.name).map(n =>
      n.assignedTo.name);
    const usersNum = users.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)),
      new Map());
    usersNum.forEach((value, key) => {
      this.assignedChartLabels.push(key);
      this.assignedChartValues.push(value);
    });
    const notAssignedTasks = this.tasks.length - (this.assignedChartValues.reduce(
      (acc, val) => acc = acc + val));
    this.assignedChartLabels.push('no one');
    this.assignedChartValues.push(notAssignedTasks);
  }

}

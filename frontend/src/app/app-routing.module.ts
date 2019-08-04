import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { RoleGuardService } from './shared/guards/role-guard.service';

import { LoginViewComponent } from './login-view/login-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { ProjectsViewComponent } from './main-view/projects/projects-view/projects-view.component';
import { SprintsViewComponent } from './main-view/sprints/sprints-view/sprints-view.component';
import { TasksViewComponent } from './main-view/tasks/tasks-view/tasks-view.component';
import { AboutViewComponent } from './main-view/about-view/about-view.component';
import { StatisticsViewComponent } from './main-view/statistics-view/statistics-view.component';
import { UsersViewComponent } from './main-view/users/users-view/users-view.component';
import { UsersDetailViewComponent } from './main-view/users/users-detail-view/users-detail-view.component';
import { TasksDetailViewComponent } from './main-view/tasks/tasks-detail-view/tasks-detail-view.component';
import { SprintsDetailViewComponent } from './main-view/sprints/sprints-detail-view/sprints-detail-view.component';
import { ProjectsDetailViewComponent } from './main-view/projects/projects-detail-view/projects-detail-view.component';
import { UsersNewViewComponent } from './main-view/users/users-new-view/users-new-view.component';
import { TasksNewViewComponent } from './main-view/tasks/tasks-new-view/tasks-new-view.component';
import { SprintsNewViewComponent } from './main-view/sprints/sprints-new-view/sprints-new-view.component';
import { ProjectsNewViewComponent } from './main-view/projects/projects-new-view/projects-new-view.component';
import { BoardViewComponent } from './main-view/board-view/board-view.component';

const routes: Routes = [
  { path: 'login', component: LoginViewComponent },
  {
    path: '', component: MainViewComponent, canActivate: [AuthGuardService], children: [
      { path: 'home', component: BoardViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'projects', component: ProjectsViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'projects/:id', component: ProjectsDetailViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'projectsNew', component: ProjectsNewViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'sprints', component: SprintsViewComponent, canActivate: [AuthGuardService] },
      { path: 'sprints/:id', component: SprintsDetailViewComponent, canActivate: [AuthGuardService] },
      { path: 'sprintsNew', component: SprintsNewViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'tasks', component: TasksViewComponent, canActivate: [AuthGuardService] },
      { path: 'tasks/:id', component: TasksDetailViewComponent, canActivate: [AuthGuardService] },
      { path: 'tasksNew', component: TasksNewViewComponent, canActivate: [AuthGuardService] },
      { path: 'users', component: UsersViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'users/:id', component: UsersDetailViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'usersNew', component: UsersNewViewComponent, canActivate: [AuthGuardService, RoleGuardService] },
      { path: 'account/:id', component: UsersDetailViewComponent, canActivate: [AuthGuardService] },
      { path: 'statistics', component: StatisticsViewComponent, canActivate: [AuthGuardService] },
      { path: 'about', component: AboutViewComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '**', component: ErrorViewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './main-view/main-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { TopNavbarComponent } from './shared/components/top-navbar/top-navbar.component';
import { SideNavbarComponent } from './shared/components/side-navbar/side-navbar.component';
import { BoardViewComponent } from './main-view/board-view/board-view.component';
import { SingleCardComponent } from './shared/components/single-card/single-card.component';
import { ProjectsViewComponent } from './main-view/projects/projects-view/projects-view.component';
import { AboutViewComponent } from './main-view/about-view/about-view.component';
import { StatisticsViewComponent } from './main-view/statistics-view/statistics-view.component';
import { TasksViewComponent } from './main-view/tasks/tasks-view/tasks-view.component';
import { SprintsViewComponent } from './main-view/sprints/sprints-view/sprints-view.component';
import { UsersViewComponent } from './main-view/users/users-view/users-view.component';
import { UsersDetailViewComponent } from './main-view/users/users-detail-view/users-detail-view.component';
import { TasksDetailViewComponent } from './main-view/tasks/tasks-detail-view/tasks-detail-view.component';
import { SprintsDetailViewComponent } from './main-view/sprints/sprints-detail-view/sprints-detail-view.component';
import { ProjectsDetailViewComponent } from './main-view/projects/projects-detail-view/projects-detail-view.component';
import { UsersNewViewComponent } from './main-view/users/users-new-view/users-new-view.component';
import { TasksNewViewComponent } from './main-view/tasks/tasks-new-view/tasks-new-view.component';
import { SprintsNewViewComponent } from './main-view/sprints/sprints-new-view/sprints-new-view.component';
import { ProjectsNewViewComponent } from './main-view/projects/projects-new-view/projects-new-view.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

import { ToastService } from './shared/services/toast.service';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    LoginViewComponent,
    ErrorViewComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    BoardViewComponent,
    SingleCardComponent,
    ProjectsViewComponent,
    AboutViewComponent,
    StatisticsViewComponent,
    TasksViewComponent,
    SprintsViewComponent,
    UsersViewComponent,
    UsersDetailViewComponent,
    TasksDetailViewComponent,
    SprintsDetailViewComponent,
    ProjectsDetailViewComponent,
    UsersNewViewComponent,
    TasksNewViewComponent,
    SprintsNewViewComponent,
    ProjectsNewViewComponent,
    ToastComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    ToastService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

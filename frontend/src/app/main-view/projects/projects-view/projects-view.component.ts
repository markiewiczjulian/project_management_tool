import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/services/projects.service';
import { Project } from '../../../shared/models/project';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css']
})
export class ProjectsViewComponent implements OnInit {

  projects: Project[];

  constructor(private projectsService: ProjectsService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectsService.getAll().subscribe(data => {
      this.projects = data;
    },
      (err: string) => {
        this.toastService.error(err);
      });
  }

  deleteProject(id) {
    this.projectsService.delete(id).subscribe(() => {
      this.getAllProjects();
      this.toastService.success(`You have deleted a project "${id}"`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }
}

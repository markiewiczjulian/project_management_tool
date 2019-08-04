import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../shared/services/projects.service';
import { SprintsService } from '../../../shared/services/sprints.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../../../shared/models/project';
import { Sprint } from '../../../shared/models/sprint';
import { User } from '../../../shared/models/user';
import { ProjectSprint } from '../../../shared/models/project-sprints';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastService } from '../../../shared/services/toast.service';


@Component({
  selector: 'app-projects-detail-view',
  templateUrl: './projects-detail-view.component.html',
  styleUrls: ['./projects-detail-view.component.css']
})
export class ProjectsDetailViewComponent implements OnInit {

  project: Project;
  sprints: Sprint[];
  users: User[];
  placeholder = 'none';
  id = this.route.snapshot.paramMap.get('id');

  constructor(private sprintService: SprintsService, private projectsService: ProjectsService,
    private route: ActivatedRoute, private router: Router, public ngxSmartModalService:
      NgxSmartModalService, private toastService: ToastService) { }

  ngOnInit() {
    this.getProject(this.id);
    this.getSprints();
  }

  getProject(id) {
    this.projectsService.getOne(id).subscribe(data => {
      this.project = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteProject(id) {
    this.projectsService.delete(id).subscribe(() => {
      this.router.navigate(['/projects']);
      this.toastService.success(`You have deleted a project "${this.project.name}"`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  editProject(form) {
    form.value.sprints = this.project.sprints.map(sprint => sprint._id);
    this.projectsService.update(form.value, this.project._id).subscribe(
      () => {
        this.toastService.success(`You have saved a project "${this.project.name}"`);
        form.resetForm();
        this.router.navigate(['/projects']);
      }, (err: string) => {
        this.toastService.error(err);
      });
  }

  deleteSubSprint(projectId: string, sprintId: string) {
    const projectSprint: ProjectSprint = { project: projectId, sprint: sprintId };
    this.projectsService.deleteSprint(projectSprint).subscribe(() => {
      this.getProject(this.id);
      this.toastService.success(`You have removed sprint "${sprintId}" from a project.`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  addSubSprint(projectId: string, sprintId: string) {
    const projectSprint: ProjectSprint = { project: projectId, sprint: sprintId };
    this.projectsService.addSprint(projectSprint).subscribe(() => {
      this.getProject(this.id);
      this.toastService.success(`You have added sprint "${sprintId}" to a project.`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  getSprints() {
    this.sprintService.getAll().subscribe(data => {
      this.sprints = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }
}

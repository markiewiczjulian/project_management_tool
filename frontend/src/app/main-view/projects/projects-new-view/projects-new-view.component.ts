import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-projects-new-view',
  templateUrl: './projects-new-view.component.html',
  styleUrls: ['./projects-new-view.component.css']
})
export class ProjectsNewViewComponent implements OnInit {

  constructor(private projectsService: ProjectsService,
    private router: Router, private auth: AuthService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  addProject(form) {
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    form.value.createdBy = this.auth.getLoggedUser();
    form.value.sprints = [];
    this.projectsService.create(form.value).subscribe(
      () => {
        this.toastService.success(`You have added a project "${form.value.name}"`);
        form.resetForm();
        this.router.navigate(['/projects']);
      }, (err: string) => {
        this.toastService.error(err);
      });
  }
}

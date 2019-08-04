import { Component, OnInit } from '@angular/core';
import { SprintsService } from '../../../shared/services/sprints.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-sprints-new-view',
  templateUrl: './sprints-new-view.component.html',
  styleUrls: ['./sprints-new-view.component.css']
})
export class SprintsNewViewComponent implements OnInit {

  constructor(private sprintsService: SprintsService,
    private router: Router, private auth: AuthService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  addSprint(form) {
    Object.keys(form.value).forEach(k => (!form.value[k] && form.value[k] !==
      undefined) && delete form.value[k]);
    form.value.createdBy = this.auth.getLoggedUser();
    form.value.subtasks = [];
    this.sprintsService.create(form.value).subscribe(
      () => {
        this.toastService.success(`You have added a sprint "${form.value.name}"`);
        form.resetForm();
        this.router.navigate(['/sprints']);
      }, (err: string) => {
        this.toastService.error(err);
      });
  }
}

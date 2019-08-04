import { Component, OnInit } from '@angular/core';
import { SprintsService } from '../../../shared/services/sprints.service';
import { Sprint } from '../../../shared/models/sprint';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-sprints-view',
  templateUrl: './sprints-view.component.html',
  styleUrls: ['./sprints-view.component.css']
})
export class SprintsViewComponent implements OnInit {

  sprints: Sprint[];
  isAdmin: boolean;

  constructor(private sprintsSerice: SprintsService, private auth: AuthService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getAllSprints();
    this.isAdmin = this.auth.isAdmin();
  }

  getAllSprints() {
    this.sprintsSerice.getAll().subscribe(data => {
      this.sprints = data;
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

  deleteSprint(id) {
    this.sprintsSerice.delete(id).subscribe(() => {
      this.getAllSprints();
      this.toastService.success(`You have deleted a sprint "${id}"`);
    }, (err: string) => {
      this.toastService.error(err);
    });
  }

}

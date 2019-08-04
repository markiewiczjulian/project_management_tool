import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() status: string;
  @Input() priority: string;
  @Input() assignedTo: { id: string, name: string };
  @Input() done: boolean;

  constructor() { }

  ngOnInit() {
  }

  checkPriority() {
    if (this.priority === 'low') {
      return 'fa-arrow-down text-info';
    } else if (this.priority === 'medium') {
      return 'fa-arrow-down text-success';
    } else if (this.priority === 'high') {
      return 'fa-arrow-up text-warning';
    } else if (this.priority === 'highest') {
      return 'fa-arrow-up text-danger';
    } else {
      return;
    }
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDetailViewComponent } from './tasks-detail-view.component';

describe('TasksDetailViewComponent', () => {
  let component: TasksDetailViewComponent;
  let fixture: ComponentFixture<TasksDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

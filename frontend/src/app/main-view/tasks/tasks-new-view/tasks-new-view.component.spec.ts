import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksNewViewComponent } from './tasks-new-view.component';

describe('TasksNewViewComponent', () => {
  let component: TasksNewViewComponent;
  let fixture: ComponentFixture<TasksNewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksNewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

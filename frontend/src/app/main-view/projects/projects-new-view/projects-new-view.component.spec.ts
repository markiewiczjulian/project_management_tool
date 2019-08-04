import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsNewViewComponent } from './projects-new-view.component';

describe('ProjectsNewViewComponent', () => {
  let component: ProjectsNewViewComponent;
  let fixture: ComponentFixture<ProjectsNewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsNewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

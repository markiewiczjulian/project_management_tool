import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetailViewComponent } from './projects-detail-view.component';

describe('ProjectsDetailViewComponent', () => {
  let component: ProjectsDetailViewComponent;
  let fixture: ComponentFixture<ProjectsDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsDetailViewComponent } from './sprints-detail-view.component';

describe('SprintsDetailViewComponent', () => {
  let component: SprintsDetailViewComponent;
  let fixture: ComponentFixture<SprintsDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

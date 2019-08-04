import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsViewComponent } from './sprints-view.component';

describe('SprintsViewComponent', () => {
  let component: SprintsViewComponent;
  let fixture: ComponentFixture<SprintsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

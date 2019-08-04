import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintsNewViewComponent } from './sprints-new-view.component';

describe('SprintsNewViewComponent', () => {
  let component: SprintsNewViewComponent;
  let fixture: ComponentFixture<SprintsNewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintsNewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintsNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

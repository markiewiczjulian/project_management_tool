import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersNewViewComponent } from './users-new-view.component';

describe('UsersNewViewComponent', () => {
  let component: UsersNewViewComponent;
  let fixture: ComponentFixture<UsersNewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersNewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

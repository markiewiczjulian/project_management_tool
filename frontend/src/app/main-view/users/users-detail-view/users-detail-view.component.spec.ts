import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailViewComponent } from './users-detail-view.component';

describe('UsersDetailViewComponent', () => {
  let component: UsersDetailViewComponent;
  let fixture: ComponentFixture<UsersDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

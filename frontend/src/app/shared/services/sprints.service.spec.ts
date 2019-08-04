import { TestBed } from '@angular/core/testing';

import { SprintsService } from './sprints.service';

describe('SprintsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintsService = TestBed.get(SprintsService);
    expect(service).toBeTruthy();
  });
});

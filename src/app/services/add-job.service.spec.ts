import { TestBed } from '@angular/core/testing';

import { AddJobService } from './add-job.service';

describe('AddJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddJobService = TestBed.get(AddJobService);
    expect(service).toBeTruthy();
  });
});

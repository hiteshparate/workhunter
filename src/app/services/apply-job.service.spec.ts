import { TestBed } from '@angular/core/testing';

import { ApplyJobService } from './apply-job.service';

describe('ApplyJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyJobService = TestBed.get(ApplyJobService);
    expect(service).toBeTruthy();
  });
});

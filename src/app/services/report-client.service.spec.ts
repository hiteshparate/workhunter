import { TestBed } from '@angular/core/testing';

import { ReportClientService } from './report-client.service';

describe('ReportClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportClientService = TestBed.get(ReportClientService);
    expect(service).toBeTruthy();
  });
});

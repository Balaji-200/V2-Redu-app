import { TestBed } from '@angular/core/testing';

import { DemographicDataService } from './demographic-data.service';

describe('DemographicDataService', () => {
  let service: DemographicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemographicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

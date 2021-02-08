import { TestBed } from '@angular/core/testing';

import { PretestService } from './pretest.service';

describe('PretestService', () => {
  let service: PretestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PretestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

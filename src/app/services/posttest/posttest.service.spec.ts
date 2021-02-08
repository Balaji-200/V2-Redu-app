import { TestBed } from '@angular/core/testing';

import { PosttestService } from './posttest.service';

describe('PosttestService', () => {
  let service: PosttestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosttestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

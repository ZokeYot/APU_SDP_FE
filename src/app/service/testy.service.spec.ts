import { TestBed } from '@angular/core/testing';

import { TestyService } from './testy.service';

describe('TestyService', () => {
  let service: TestyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

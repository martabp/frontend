import { TestBed } from '@angular/core/testing';

import { ApiFootball } from './api-football';

describe('ApiFootball', () => {
  let service: ApiFootball;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFootball);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

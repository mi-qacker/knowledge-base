import {TestBed} from '@angular/core/testing';

import {NonLoginGuard} from './non-login.guard';

describe('NonLoginGuard', () => {
  let guard: NonLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NonLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

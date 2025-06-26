import { TestBed } from '@angular/core/testing';

import { MyService } from './myservice';

describe('Myservice', () => {
  let service: MyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

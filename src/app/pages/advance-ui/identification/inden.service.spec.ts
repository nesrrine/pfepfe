import { TestBed } from '@angular/core/testing';

import { ProgrammeService } from './inden.service';

describe('ProgrammeService', () => {
  let service: ProgrammeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

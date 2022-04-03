import { TestBed } from '@angular/core/testing';

import { JapNamesService } from './jap-names.service';

describe('JapNamesService', () => {
  let service: JapNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JapNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

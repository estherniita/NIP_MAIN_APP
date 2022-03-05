import { TestBed } from '@angular/core/testing';

import { StudentInternsService } from './student-interns.service';

describe('StudentInternsService', () => {
  let service: StudentInternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentInternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

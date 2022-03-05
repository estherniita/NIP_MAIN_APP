import { TestBed } from '@angular/core/testing';

import { CompletedInternshipsServicesService } from './completed-internships-services.service';

describe('CompletedInternshipsServicesService', () => {
  let service: CompletedInternshipsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedInternshipsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

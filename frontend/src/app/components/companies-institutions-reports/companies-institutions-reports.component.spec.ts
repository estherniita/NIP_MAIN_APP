import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesInstitutionsReportsComponent } from './companies-institutions-reports.component';

describe('CompaniesInstitutionsReportsComponent', () => {
  let component: CompaniesInstitutionsReportsComponent;
  let fixture: ComponentFixture<CompaniesInstitutionsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesInstitutionsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesInstitutionsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

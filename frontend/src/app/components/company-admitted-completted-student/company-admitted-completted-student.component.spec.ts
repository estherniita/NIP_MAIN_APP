import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdmittedComplettedStudentComponent } from './company-admitted-completted-student.component';

describe('CompanyAdmittedComplettedStudentComponent', () => {
  let component: CompanyAdmittedComplettedStudentComponent;
  let fixture: ComponentFixture<CompanyAdmittedComplettedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAdmittedComplettedStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdmittedComplettedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

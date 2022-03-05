import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStudentListComponent } from './company-student-list.component';

describe('CompanyStudentListComponent', () => {
  let component: CompanyStudentListComponent;
  let fixture: ComponentFixture<CompanyStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyStudentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

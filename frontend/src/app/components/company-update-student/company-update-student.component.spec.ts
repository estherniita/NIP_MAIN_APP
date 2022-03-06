import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdateStudentComponent } from './company-update-student.component';

describe('CompanyUpdateStudentComponent', () => {
  let component: CompanyUpdateStudentComponent;
  let fixture: ComponentFixture<CompanyUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUpdateStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

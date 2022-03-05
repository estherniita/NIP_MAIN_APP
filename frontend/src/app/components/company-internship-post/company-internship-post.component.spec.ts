import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInternshipPostComponent } from './company-internship-post.component';

describe('CompanyInternshipPostComponent', () => {
  let component: CompanyInternshipPostComponent;
  let fixture: ComponentFixture<CompanyInternshipPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInternshipPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInternshipPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionReportsComponent } from './institution-reports.component';

describe('InstitutionReportsComponent', () => {
  let component: InstitutionReportsComponent;
  let fixture: ComponentFixture<InstitutionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

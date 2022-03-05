import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentInternshipsToInstitutionsComponent } from './sent-internships-to-institutions.component';

describe('SentInternshipsToInstitutionsComponent', () => {
  let component: SentInternshipsToInstitutionsComponent;
  let fixture: ComponentFixture<SentInternshipsToInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentInternshipsToInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentInternshipsToInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

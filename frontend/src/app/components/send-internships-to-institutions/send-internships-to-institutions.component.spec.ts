import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInternshipsToInstitutionsComponent } from './send-internships-to-institutions.component';

describe('SendInternshipsToInstitutionsComponent', () => {
  let component: SendInternshipsToInstitutionsComponent;
  let fixture: ComponentFixture<SendInternshipsToInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendInternshipsToInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInternshipsToInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionReceivedInternshipsComponent } from './institution-received-internships.component';

describe('InstitutionReceivedInternshipsComponent', () => {
  let component: InstitutionReceivedInternshipsComponent;
  let fixture: ComponentFixture<InstitutionReceivedInternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionReceivedInternshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionReceivedInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

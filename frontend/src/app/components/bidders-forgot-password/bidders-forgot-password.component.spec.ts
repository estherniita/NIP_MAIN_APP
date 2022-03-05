import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddersForgotPasswordComponent } from './bidders-forgot-password.component';

describe('BiddersForgotPasswordComponent', () => {
  let component: BiddersForgotPasswordComponent;
  let fixture: ComponentFixture<BiddersForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddersForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddersForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

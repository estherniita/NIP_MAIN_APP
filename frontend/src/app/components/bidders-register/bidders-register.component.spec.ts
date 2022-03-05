import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddersRegisterComponent } from './bidders-register.component';

describe('BiddersRegisterComponent', () => {
  let component: BiddersRegisterComponent;
  let fixture: ComponentFixture<BiddersRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddersRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddersRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

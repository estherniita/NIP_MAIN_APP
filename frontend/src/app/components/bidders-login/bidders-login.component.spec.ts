import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddersLoginComponent } from './bidders-login.component';

describe('BiddersLoginComponent', () => {
  let component: BiddersLoginComponent;
  let fixture: ComponentFixture<BiddersLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddersLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddersLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

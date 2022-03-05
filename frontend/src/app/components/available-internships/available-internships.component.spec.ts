import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableInternshipsComponent } from './available-internships.component';

describe('AvailableInternshipsComponent', () => {
  let component: AvailableInternshipsComponent;
  let fixture: ComponentFixture<AvailableInternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableInternshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAllButtonComponent } from './read-all-button.component';

describe('ReadAllButtonComponent', () => {
  let component: ReadAllButtonComponent;
  let fixture: ComponentFixture<ReadAllButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAllButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

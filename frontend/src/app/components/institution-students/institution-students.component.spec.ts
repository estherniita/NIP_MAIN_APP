import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionStudentsComponent } from './institution-students.component';

describe('InstitutionStudentsComponent', () => {
  let component: InstitutionStudentsComponent;
  let fixture: ComponentFixture<InstitutionStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

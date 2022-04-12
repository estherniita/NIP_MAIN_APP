import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedAndCompletedStudentsComponent } from './admitted-and-completed-students.component';

describe('AdmittedAndCompletedStudentsComponent', () => {
  let component: AdmittedAndCompletedStudentsComponent;
  let fixture: ComponentFixture<AdmittedAndCompletedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmittedAndCompletedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittedAndCompletedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

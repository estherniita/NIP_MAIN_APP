import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedNotCompletedStudentsComponent } from './admitted-not-completed-students.component';

describe('AdmittedNotCompletedStudentsComponent', () => {
  let component: AdmittedNotCompletedStudentsComponent;
  let fixture: ComponentFixture<AdmittedNotCompletedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmittedNotCompletedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittedNotCompletedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

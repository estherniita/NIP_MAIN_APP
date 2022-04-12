import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAdmittedStudentsComponent } from './not-admitted-students.component';

describe('NotAdmittedStudentsComponent', () => {
  let component: NotAdmittedStudentsComponent;
  let fixture: ComponentFixture<NotAdmittedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAdmittedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAdmittedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedStudentComponent } from './completed-student.component';

describe('CompletedStudentComponent', () => {
  let component: CompletedStudentComponent;
  let fixture: ComponentFixture<CompletedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

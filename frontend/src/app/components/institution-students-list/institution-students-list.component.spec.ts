import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionStudentsListComponent } from './institution-students-list.component';

describe('InstitutionStudentsListComponent', () => {
  let component: InstitutionStudentsListComponent;
  let fixture: ComponentFixture<InstitutionStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionStudentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

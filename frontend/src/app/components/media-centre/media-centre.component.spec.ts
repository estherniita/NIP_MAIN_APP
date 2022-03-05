import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCentreComponent } from './media-centre.component';

describe('MediaCentreComponent', () => {
  let component: MediaCentreComponent;
  let fixture: ComponentFixture<MediaCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

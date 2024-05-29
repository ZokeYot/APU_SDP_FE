import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerMainPageComponent } from './lecturer-main-page.component';

describe('LecturerMainPageComponent', () => {
  let component: LecturerMainPageComponent;
  let fixture: ComponentFixture<LecturerMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

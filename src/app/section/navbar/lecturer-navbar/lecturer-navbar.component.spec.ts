import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerNavbarComponent } from './lecturer-navbar.component';

describe('NavbarComponent', () => {
  let component: LecturerNavbarComponent;
  let fixture: ComponentFixture<LecturerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerNavbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LecturerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

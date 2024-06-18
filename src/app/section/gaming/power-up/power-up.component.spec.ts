import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerUpComponent } from './power-up.component';

describe('PowerUpComponent', () => {
  let component: PowerUpComponent;
  let fixture: ComponentFixture<PowerUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PowerUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

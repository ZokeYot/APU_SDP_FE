import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSubmissionsComponent } from './quiz-submissions.component';

describe('QuizSubmissionsComponent', () => {
  let component: QuizSubmissionsComponent;
  let fixture: ComponentFixture<QuizSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSubmissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

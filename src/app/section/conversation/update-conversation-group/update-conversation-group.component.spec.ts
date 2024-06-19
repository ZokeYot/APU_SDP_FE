import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConversationGroupComponent } from './update-conversation-group.component';

describe('UpdateConversationGroupComponent', () => {
  let component: UpdateConversationGroupComponent;
  let fixture: ComponentFixture<UpdateConversationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateConversationGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateConversationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

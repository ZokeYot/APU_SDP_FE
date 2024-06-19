import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGroupMemberComponent } from './delete-group-member.component';

describe('DeleteGroupMemberComponent', () => {
  let component: DeleteGroupMemberComponent;
  let fixture: ComponentFixture<DeleteGroupMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGroupMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteGroupMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

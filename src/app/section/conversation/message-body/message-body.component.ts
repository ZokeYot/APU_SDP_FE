import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Conversation, GroupConversation } from '../../../model/conversation';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-message-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-body.component.html',
  styleUrl: './message-body.component.css'
})
export class MessageBodyComponent implements OnInit, OnChanges {


  @Input() selectedConversation !: Conversation | GroupConversation

  userID: string = sessionStorage.getItem('id') as string
  conversation!: Conversation
  groupConversation !: GroupConversation

  showConversation: boolean = false;
  showGroupConversation: boolean = false;

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedConversation' in changes)
      this.updateComponent();
  }

  updateComponent(): void {
    if ('groupID' in this.selectedConversation) {
      this.groupConversation = this.selectedConversation as GroupConversation;
      this.showGroupConversation = true;
      this.showConversation = false;
    } else {
      this.conversation = this.selectedConversation as Conversation;
      this.showConversation = true;
      this.showGroupConversation = false;
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation, GroupConversation } from '../../../model/conversation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent {

  @Input() conversations !: Conversation[]
  @Input() groupConversations !: GroupConversation[]
  @Output() selectedConversation: EventEmitter<Conversation | GroupConversation> = new EventEmitter()

  conversationSelected(conversation: Conversation | GroupConversation) {
    this.selectedConversation.emit(conversation)
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestyService } from '../../../service/testy.service';
import { Router } from '@angular/router';
import { Message, UserInfo } from '../../../model/conversation';

interface Conversation {
  participantInfo: UserInfo;
  messages: Message[];
}

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
  imports: [FormsModule, CommonModule]
})


export class ConversationComponent {

  maxHeight: number = 150;
  userID: string = sessionStorage.getItem('id') as string;;
  messages !: any[];
  selectedConversation!: Conversation;
  conversations: Conversation[] = []


  @ViewChild('messageBox') textArea !: ElementRef
  @ViewChild('chatBox') chatBox !: ElementRef


  constructor(private cdr: ChangeDetectorRef, private service: TestyService, private router: Router) {
    this.userID
    this.messages = [];
  }


  groupMessagesByUser(messagesWithInfo: any[]): Conversation[] {
    const groupedConversations: { [key: number]: Conversation } = {};

    messagesWithInfo.forEach(item => {
      const participantID = item.senderID === +this.userID ? item.receiverID : item.senderID;
      if (!groupedConversations[participantID]) {
        groupedConversations[participantID] = {
          participantInfo: item.participantInfo,
          messages: []
        };
      }
      groupedConversations[participantID].messages.push({
        senderID: item.senderID,
        receiverID: item.receiverID,
        date: item.date,
        content: item.content
      });
    });

    return Object.values(groupedConversations);
  }


  handleKeydown(event: KeyboardEvent): void {
    const textarea = this.textArea.nativeElement;

    if (event.key === 'Enter' && event.shiftKey) {
      this.adjustHeight(textarea);
    }
    else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage()
    }
  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto'

    if (textarea.scrollHeight <= this.maxHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = `${this.maxHeight}px`;
      textarea.style.overflowY = 'auto';
    }
  }

  sendMessage(): void {

  }

  getGroupMessages() {

  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation
    console.log(conversation.content)
  }


}

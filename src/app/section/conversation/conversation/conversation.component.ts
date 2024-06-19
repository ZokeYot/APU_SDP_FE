import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestyService } from '../../../service/testy.service';
import { Router } from '@angular/router';
import { ConversationListComponent } from "../conversation-list/conversation-list.component";
import { MessageBodyComponent } from "../message-body/message-body.component";
import { Subscription, interval, switchMap } from 'rxjs';
import { Conversation, GroupConversation } from '../../../model/conversation';


@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
  imports: [FormsModule, CommonModule, ConversationListComponent, MessageBodyComponent]
})


export class ConversationComponent implements OnInit, OnDestroy {

  maxHeight: number = 150;
  userID: string = sessionStorage.getItem('id') as string;;
  messages !: any[];

  selectedConversation!: Conversation | GroupConversation;
  showConversation: boolean = false;
  conversations !: Conversation[]
  groupConversations !: GroupConversation[]

  pollingInterval = 60000;
  lastDateTime: string = "1970-01-01 00:00:00"
  conversationSubscription !: Subscription;
  groupConversationSubscription !: Subscription;


  @ViewChild('messageBox') textArea!: ElementRef
  @ViewChild('chatBox') chatBox!: ElementRef


  constructor(private cdr: ChangeDetectorRef, private service: TestyService, private router: Router) { }

  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.service.get_messages(this.userID, this.lastDateTime).subscribe(data => this.conversations = data)
    this.service.get_group_messages(this.userID, this.lastDateTime).subscribe(data => this.groupConversations = data)

    this.conversationSubscription = interval(this.pollingInterval)
      .pipe(
        switchMap(() => this.service.get_messages(this.userID, this.lastDateTime))
      ).subscribe(data => {

      })

    this.groupConversationSubscription = interval(this.pollingInterval)
      .pipe(
        switchMap(() => this.service.get_group_messages(this.userID, this.lastDateTime))
      ).subscribe(data => {

      })
  }


  updateConversation(data: Conversation[]) {
    if (data.length > 0) {
      data.forEach(conversation => {
        const { userID, name, profile_picture, messages } = conversation
      })
    }
  }

  updateGroupConversation(data: GroupConversation[]) {

  }

  selectConversation(conversation: Conversation | GroupConversation) {
    this.selectedConversation = conversation
    this.showConversation = true
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

}

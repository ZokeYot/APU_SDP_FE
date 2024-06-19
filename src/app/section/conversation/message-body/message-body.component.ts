import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Conversation, GroupConversation } from '../../../model/conversation';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-message-body',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './message-body.component.html',
  styleUrl: './message-body.component.css'
})
export class MessageBodyComponent implements OnInit, OnChanges, AfterViewChecked {


  @Input() selectedConversation !: Conversation | GroupConversation
  @ViewChild('groupMessages') groupMessageElement!: ElementRef
  @ViewChild('messages') messageElement !: ElementRef

  userID: string = sessionStorage.getItem('id') as string
  conversation!: Conversation
  groupConversation !: GroupConversation
  isAdmin !: boolean
  userOne !: boolean
  userTwo !: boolean

  showConversation: boolean = false;
  showGroupConversation: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.updateComponent();
  }

  ngAfterViewChecked(): void {
    if (this.showConversation && this.messageElement)
      this.userScrollToBottom()

    if (this.showGroupConversation && this.groupMessageElement)
      this.groupScrollToBottom()
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedConversation' in changes)
      this.updateComponent();
  }

  updateGroup(conversation: any) {
    const group = conversation as GroupConversation
    this.router.navigateByUrl(`/update-group/${group.groupID}`)

  }

  updateComponent(): void {
    if ('groupID' in this.selectedConversation) {
      this.groupConversation = this.selectedConversation as GroupConversation;
      this.showGroupConversation = true;
      this.showConversation = false;
      this.isAdmin = this.groupConversation.adminID == this.userID
      this.groupConversation.messages.forEach(message => {
        message.belongCurrUser = message.senderID.toString() as string === this.userID
      })
    } else {
      this.conversation = this.selectedConversation as Conversation;
      this.showConversation = true;
      this.showGroupConversation = false;
      this.conversation.messages.forEach(message => {
        message.belongCurrUser = message.senderID.toString() === this.userID
      })
    }
  }

  groupScrollToBottom() {
    try {
      this.groupMessageElement.nativeElement.scrollTop = this.groupMessageElement.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  userScrollToBottom() {
    try {
      this.messageElement.nativeElement.scrollTop = this.messageElement.nativeElement.scrollHeight;
    } catch (err) {

    }
  }
}

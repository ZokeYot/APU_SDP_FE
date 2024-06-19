import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConversationListComponent } from "../conversation-list/conversation-list.component";
import { MessageBodyComponent } from "../message-body/message-body.component";
import { Subscription, filter, interval, switchMap } from 'rxjs';
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
  message !: string;

  selectedConversation!: Conversation | GroupConversation;
  showConversation: boolean = false;
  conversations: Conversation[] = []
  groupConversations: GroupConversation[] = []

  pollingInterval = 30000;
  lastDateTime: string = "1970-01-01 00:00:00"
  subscription !: Subscription
  refreshTimer: any
  typingTimer: any
  typingDelay: number = 1000;

  @ViewChild('messageBox') textArea!: ElementRef



  constructor(private cdr: ChangeDetectorRef, private service: TestyService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.stopRefreshing();
    if (this.subscription)
      this.subscription.unsubscribe()

  }

  ngOnInit(): void {
    this.startRefreshing();
    this.fetchMessages()
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.stopRefreshing())
  }

  startRefreshing() {
    this.refreshTimer = setInterval(() => {
      this.refreshMessages();
    }, this.pollingInterval)
  }

  stopRefreshing() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }


  refreshMessages() {
    this.conversations = [];
    this.groupConversations = []

    this.fetchMessages()
  }

  onTyping(event: any) {
    clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(() => {
      this.fetchMessages();
      this.startRefreshing();
    }, this.typingDelay)
  }


  fetchMessages() {
    this.service.get_messages(this.userID, this.lastDateTime).subscribe(data => {
      this.conversations = data

      if (Object.keys(this.route.snapshot.queryParams).length > 0) {
        this.route.queryParams.subscribe(params => {
          const conversation = {
            "userID": params['receiverID'] as string,
            "name": params['name'] as string,
            "profile_picture": this.service.get_blob_data() as string,
            "messages": []
          }

          const exist = this.conversations.find(f => f.userID == conversation.userID)
          if (!exist) {
            this.conversations.push(conversation)
            this.selectConversation(conversation)
          } else
            this.selectConversation(exist)
        })
      }

    })
    this.service.get_group_messages(this.userID, this.lastDateTime).subscribe(data => this.groupConversations = data)
  }

  selectConversation(conversation: Conversation | GroupConversation) {
    this.selectedConversation = conversation
    this.showConversation = true
  }


  handleKeydown(event: KeyboardEvent): void {
    const textarea = this.textArea.nativeElement as HTMLTextAreaElement;

    if (event.key === 'Enter' && event.shiftKey) {
      this.adjustHeight(textarea);
    }
    else if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage()
      textarea.value = ""

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
    const currentTime = new Date().toISOString().replace('T', ' ').substring(0, 19).replace(/-/g, '-').replace(/:/g, ':');
    if ('groupID' in this.selectedConversation) {
      const conversation = this.selectedConversation as GroupConversation
      const message = {
        groupID: conversation.groupID,
        senderID: this.userID,
        date: currentTime,
        content: this.message,
        belongCurrUser: true,
        profile_picture: "",
        name: ""
      }

      conversation.messages.push(message)
      this.service.send_group_message(message).subscribe()

    } else {
      const conversation = this.selectedConversation as Conversation

      const message = {
        senderID: this.userID,
        receiverID: conversation.userID,
        content: this.message,
        date: currentTime,
        belongCurrUser: true
      }
      conversation.messages.push(message)
      this.service.send_message(message).subscribe()
    }
  }

}

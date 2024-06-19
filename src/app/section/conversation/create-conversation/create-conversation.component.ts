import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { Router, RouterModule } from '@angular/router';
import { UserInfo } from '../../../model/conversation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-conversation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './create-conversation.component.html',
  styleUrl: './create-conversation.component.css'
})
export class CreateConversationComponent {

  users: UserInfo[] = []
  filteredUsers = [...this.users]
  userID: string = sessionStorage.getItem('id') as string

  constructor(private service: TestyService, private router: Router) {
    this.service.get_all_user().subscribe(data => this.users = data.filter(user => user.id.toString() !== this.userID))
  }


  searchUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  createConversation(user: UserInfo) {
    if (confirm(`Open a new conversation with ${user.name}. Are u sure ??`)) {
      this.router.navigate(["/conversation"], {
        queryParams: { "receiverID": user.id, "name": user.name }
      })
      this.service.store_blob_data(user.profile_picture)
    }
  }
}

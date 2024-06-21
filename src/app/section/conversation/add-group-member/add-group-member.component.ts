import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserInfo } from '../../../model/conversation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Member {
  memberID: string
}

@Component({
  selector: 'app-add-group-member',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-group-member.component.html',
  styleUrl: './add-group-member.component.css'
})
export class AddGroupMemberComponent {
  users: UserInfo[] = []
  filteredUsers = [...this.users]
  selectedUsers: Member[] = []
  groupID !: string
  userID!: string
  searching !: string

  constructor(private service: TestyService, private router: Router, private route: ActivatedRoute) {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.userID = sessionStorage.getItem('id') as string
    this.service.get_all_user().subscribe(data => {
      this.users = data.filter(user => user.id.toString() !== this.userID)
    })
  }


  searchUser(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  toggleSelected(user: any) {
    const index = this.findIndex(user.id)

    if (index === -1)
      this.selectedUsers.push({ memberID: user.id })
    else
      this.selectedUsers.splice(index, 1)
  }

  findIndex(userID: string) {
    return this.selectedUsers.findIndex((u) => u.memberID === userID)
  }

  addMember() {
    this.service.add_group_members(this.groupID, this.selectedUsers).subscribe({
      next: (response) => {
        alert(response.success)
        this.router.navigateByUrl('/conversation')
      },
      error: (response) => {
        alert(response.error.failre || "Failed to add members")
        this.router.navigateByUrl('/conversation')
      }
    })
  }

}

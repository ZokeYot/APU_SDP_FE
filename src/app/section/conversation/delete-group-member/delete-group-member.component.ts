import { Component } from '@angular/core';
import { TestyService } from '../../../service/testy.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserInfo } from '../../../model/conversation';
import { CommonModule } from '@angular/common';

interface Member {
  memberID: string
}

@Component({
  selector: 'app-delete-group-member',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-group-member.component.html',
  styleUrl: './delete-group-member.component.css'
})
export class DeleteGroupMemberComponent {
  users: UserInfo[] = []
  filteredUsers = [...this.users]
  selectedUsers: Member[] = []
  groupID !: string
  userID!: string

  constructor(private service: TestyService, private router: Router, private route: ActivatedRoute) {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.userID = sessionStorage.getItem('id') as string
    this.service.get_group_members(this.groupID).subscribe(data => {
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

  removeMember() {
    if (this.selectedUsers.length == 0) {
      alert('No member selected !!')
    } else {
      this.service.delete_group_members(this.groupID, this.selectedUsers).subscribe({
        next: (response) => {
          alert(response.success)
          this.router.navigateByUrl('/conversation')
        },
        error: (response) => {
          alert(response.error.failre || "Failed to delete members")
          this.router.navigateByUrl('/conversation')
        }
      })
    }

  }

}

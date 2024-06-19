import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-group',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './update-group.component.html',
  styleUrl: './update-group.component.css'
})
export class UpdateGroupComponent {

  profile_picture !: string;
  name !: string
  groupID !: string


  constructor(private service: TestyService, private route: ActivatedRoute, private router: Router) {
    this.groupID = this.route.snapshot.paramMap.get('id') as string;
    this.service.get_group_info(this.groupID).subscribe(data => {
      this.name = data.name;
      this.profile_picture = data.profile_picture;
    })
  }


  updateGroup() {
    if (this.name.trim() === "")
      alert('What u trying to do ? Put a name for ur group')
    else
      this.service.update_group_info({ "groupID": this.groupID, "name": this.name, "profile_picture": this.profile_picture })
        .subscribe({
          next: (response) => {
            alert(response.success)
            this.router.navigateByUrl('/conversation')
          },
          error: (response) => {
            alert(response.error.failure || "Failed to update the group")
            this.router.navigateByUrl('/conversation')
          }
        })



  }

  deleteGroup() {
    if (confirm("Are u sure want to delete this group conversation ?? This action can't be undo"))
      this.service.delete_group(this.groupID).subscribe({
        next: (response) => {
          alert(response.success)
          this.router.navigateByUrl('/conversation')
        },
        error: (response) => {
          alert(response.error.failure || "Failed to delete the group")
          this.router.navigateByUrl('/conversation')
        }
      })
  }

  addMember() {
    this.router.navigateByUrl(`/group/add-member/${this.groupID}`)
  }

  removeMember() {
    this.router.navigateByUrl(`/group/remove-member/${this.groupID}`)
  }

  uploadFile(): void {
    const element = document.getElementById('profile-input') as HTMLInputElement
    element.click();
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profile_picture = e.target.result.split(',')[1]
    };
    reader.readAsDataURL(file);
  }
}

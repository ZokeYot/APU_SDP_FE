import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';

@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

  profile_picture !: string;
  name !: string;
  description !: string
  imageUrl !: string

  userID: string = sessionStorage.getItem('id') as string


  constructor(private service: TestyService, private router: Router) {

  }

  createGroup() {
    if (!this.profile_picture)
      alert("Please upload a profile picture for the group")
    else if (!this.name)
      alert("No name for group ?? Come on ")
    else {
      if (!this.description)
        this.description = "The group admin lazy to put one..."

      const newGroup = {
        "userID": this.userID,
        "name": this.name,
        "description": this.description,
        "profile_picture": this.profile_picture
      }
      this.service.create_group(newGroup).subscribe({
        next: (response) => {
          alert(response.success)
          this.router.navigateByUrl("/conversation")
        },
        error: (response) => {
          alert(response.error.failure || "Failed to create group")
          this.router.navigateByUrl("/conversation")
        }
      })
    }

  }

  uploadFile(): void {
    const element = document.getElementById('profile-input') as HTMLInputElement
    element.click();
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result
      this.profile_picture = this.imageUrl.split(',')[1]
    };
    reader.readAsDataURL(file);
  }
}

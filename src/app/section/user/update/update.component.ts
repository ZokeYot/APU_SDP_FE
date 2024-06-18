import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  user !: any
  userID !: string;
  name !: string;
  gender !: string;
  dob !: string;
  old_password !: string;
  new_password !: string;
  password !: string;
  profile_picture !: string;
  old_title !: string;
  new_title !: string;
  imageUrl  !: string;
  titles !: any[];
  isStudent !: boolean;
  errorMessage !: boolean;

  constructor(private service: TestyService, private router: Router) {
    this.userID = sessionStorage.getItem('id') as string;
    this.isStudent = sessionStorage.getItem('role') === 'student'
    this.errorMessage = true;
  }
  ngOnInit(): void {
    this.getProfile();
    if (sessionStorage.getItem('role') === 'student')
      this.getStudentTitle();

  }


  checkOldPassword() {
    this.errorMessage = this.old_password === undefined || this.old_password.trim() === ""
  }


  submit() {
    if (this.new_title == undefined)
      this.new_title = this.old_title

    if (this.errorMessage)
      alert("Old password did not provided, password will not changed")
    else {
      if (this.old_password !== this.password)
        alert('Incorrect old password , the password does not changed!!')
      else
        this.password = this.new_password
    }


    const newProfile = {
      "id": this.userID,
      "name": this.name,
      "gender": this.gender,
      "dob": this.dob.replaceAll("-", ""),
      "password": this.password,
      "profile_picture": this.profile_picture,
      "title": this.new_title
    }

    console.log(newProfile)

    this.service.update_profile(newProfile).subscribe({
      next: (response) => {
        alert(response.success)
        this.router.navigateByUrl('/home-page')
      },
      error: (response) => {
        alert(response.error.failure)
        this.router.navigateByUrl('/home-page')
      }
    })


  }

  getStudentTitle() {
    this.service.get_user_titles(this.userID).subscribe(data => this.titles = data)
  }

  getProfile() {
    if (!sessionStorage.getItem('id')) {
      alert("User ID not found in the session !! Navigate to the login page")
      this.router.navigateByUrl("/login");
    }

    this.service.get_profile(this.userID).subscribe(
      data => {
        this.user = data;
        this.name = this.user.name;
        this.gender = this.user.gender;
        this.dob = this.user.dob;
        this.password = this.user.password;
        this.old_title = this.user.title;
        this.profile_picture = this.user.profile_picture
        this.imageUrl = "data:image/jpeg;base64," + this.user.profile_picture
      }
    )
  }


  uploadFile() {
    const fileInput = document.getElementById("profile_picture") as HTMLInputElement;
    fileInput.click();
  }

  fileUploaded(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.profile_picture = this.imageUrl.split(',')[1];
      };
    }
  }

  back() {
    this.router.navigateByUrl('/home-page')
  }

}
